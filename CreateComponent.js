#!/usr/bin/env node
'use strict';

var fs = require('fs-extra');
var args = process.argv.splice(2,process.argv.length);
var argsList = {};
var root = null;
var cName = null; //component name
var path = null; //complete path to component

if(args.length == 2){
    path = argsList['path'] = args[0];
    cName = argsList['cName'] = args[1];
    root = path + '/' +cName;
}else if(args.length == 1){
    console.warn("Warn: Please provide a name via commond line. Ex: `node index.js 'TEST'`");
}

if(argsList['cName']){
    if(!fs.existsSync(root)) {

		//component specific.
        fs.mkdirsSync(root);

        fs.writeFileSync(root+'/'+cName+'.jsx', "import React , { Component , PropTypes} from 'react'; \nimport styles from './"+cName+".css';\n\nexport default class "+cName+" extends Component{ \n\n 	constructor(){ \n 		super(); \n 	} \n 	render() { \n 		<div>\n 			"+cName+" Component \n 		</div> \n 	}\n\n}");
        fs.writeFileSync(root+'/'+cName+'.css', '');
        fs.writeFileSync(root+'/'+cName+'.text.jsx', "import React from 'react'; \nimport { shallow } from 'enzyme'; \nimport { expect } from 'chai'; \nimport "+cName+" from ./"+cName+".jsx;");

		//stories.
        if(!fs.existsSync(root+'/__stories')) fs.mkdirsSync(root+'/__stories');
        fs.writeFileSync(root+'/__stories/index.js', "import React from 'react'; \nimport "+cName+" from '../"+cName+"'; \n \nconst stories = [ \n 	{ \n 		name: '"+cName+"', \n 		story: () => ( \n 			<div> \n 				<"+cName+" /> \n 			</div> \n 		) \n 	} \n ]; \n export default stories;");

        console.log('Component succesfully created');

    }else{
        console.error('Err: Specified Component already exist !!!');
    }
}
