'use strict';
/**
 * Example of how to use "@react-packages/thumbnail"
 * https://github.com/atmulyana/react-packages
 */
import {readFile} from 'fs';
import http from "http";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const host = '0.0.0.0';
const port = 1234;

const server = http.createServer(function(req, resp) {
    function headers(contenType) {
        return  {
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': contenType
        };
    }

    function Ok() {
        resp.writeHead(200, headers('text/plain'));
        resp.end('Ok');
    }

    if (req.method == 'OPTIONS') {
        resp.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': 86400,
        });
        resp.end('');
        return;
    }

    if (req.method == 'GET') {
        const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
        if (url.pathname == '/image') {
            try {
                let filePath = `/public/${url.search.substring(1) || 'image'}.jpg`;
                console.log('[Image Requested]:', filePath, '[ts]:', new Date().getTime());
                filePath = `${__dirname}${filePath}`;
                readFile(filePath, (err, data) => {
                    if (err) throw err;
                    resp.writeHead(200, {
                        ...headers('image/jpeg'),
                        'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate',
                        'Pragma': 'no-cache',
                        'Date': new Date(0).toUTCString(),
                        'Expires': '0',
                    });
                    resp.end(data);
                });
                return;
            }
            catch (err) {
                console.log('error: ', err);
                resp.writeHead(500, headers('text/plain'));
                resp.end('An error happened!!!');
                return;
            }
        }
    }
    Ok();
});
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});