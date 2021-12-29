import { SocketConnectionFailedError } from "@jovotech/plugin-debugger";
import { ClientRequest, RequestOptions } from "http";
import http = require("https");

var MACHINE_ID = '1';
var TOKEN = '1234567xyz';

export async function sendRequest(mode: string | undefined) {

    const options: RequestOptions = {
        hostname: 'httpbin.org',
        path: '/post',
        method: 'POST',
        headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: 'Session-Token ' + TOKEN,
            'Content-Type': 'application/json;odata=verbose',
        },
        timeout: 1000
    };
    const data = JSON.stringify({
        mode: mode
      });
    return new Promise((resolve, reject) => {
        var resp = http.request(options, (res) => {

            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('error', (err): void => {
                console.log('Error occured during request:\n');
                console.log(err);
                resolve(false);
            });
            res.on('end', (): void => {
                resolve(res.statusCode == 200);
            }
            );
            res.on('data', (d) => {
                console.log('Received:\n' + d);
              });
        });
        resp.write(data);
        resp.end();
        resp.on('error', (err): void => {
            console.log('Request error:\n');
            console.log(err);
            resolve(false);
        }
        );
        resp.on("timeout", (): void => {
            console.log('Server timeout');
            resolve(false);
        });
    });
}
