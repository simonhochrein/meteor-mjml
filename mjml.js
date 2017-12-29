// Write your package code here!
import fs from 'fs';
import path from 'path';
// import * as Handlebars from 'handlebars';
Handlebars = Npm.require('handlebars');
import { mjml2html } from 'mjml';

MJML = class MJML {
    constructor(file){
        var folder = path.dirname(file);
        this.file = file;
        this.mjml = fs.readFileSync(file,'utf8');
        var files = fs.readdirSync(folder);
        files.forEach(function (val) {
            var completePath = path.join(folder,val);
            var chunks = val.split('.');
            if(fs.statSync(completePath).isFile() && chunks.length > 0 && chunks[1]=="mjml"){
                var name = chunks[0];
                Handlebars.registerPartial(name,fs.readFileSync(completePath,'utf8'));
            }
        });
    }
    helpers(object){
        this.helpers = object;
    }
    compile() {
        var text = Handlebars.compile(this.mjml)(this.helpers||{});
        return mjml2html(text);
    }
    send(mailOptions){
        mailOptions.html = this.compile();
        Email.send(mailOptions);
    }
};
