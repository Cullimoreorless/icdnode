'use strict';

var environment = 'dev';
var config = require('../configuration').environments[environment];

var models = require('../models');

var userService = require('../src/services/userService')(models);

var siteConfigService = require('../src/services/siteConfigService')(models);
var projectService = require('../src/services/projectService')(models);
var photoService = require('../src/services/photoService')(models);


models.SiteConfiguration.create({
      logourl:'Screen-Shot-2014-01-15-at-71404-PM.png',
      logoalttext:'Ian C Design',
      introtext:'This is the product design portfolio for Ian Cullimore',
      sitetitle:'Ian C Design',
      contactemail:'me@thisdomain.com',
      personalname: 'Ian Cullimore',
      personalblurb:'Ian is a designer',
      resumeurl:'Cheesevangelists.pdf',
      contactphoto:'Screen-Shot-2015-05-31-at-121142-PM.png'
    });
    projectService.saveProject({
      name: 'Exciting Project',
      description: 'This is the most exciting project from Ian C Design if you don\'t count the others',
      teaser:'This project is exciting',
      featured:true,
      Photos:[{
            title:'Logo',
            url: 'Screen-Shot2014-01-15at71404PM.png',
            caption:'You may have noticed this is the logo. Also quite the project',
            description: 'The logo holds both an I shape overall, and a C shape. Clever, eh?',
            type:'Tile',
            order:1
      },{
            title:'KT Logo',
            url: 'KTLogoSample.png',
            caption:'This is a logo for a completely different website',
            description: 'Kamino Traveler is a site that fell apart due to poorly attending meetings by me',
            type:'Tile',
            order:2
      },{
          title:'Banner',
          url:'testbannerphoto.png',
          type:'Banner'
      }]
    }, function(err, projecturl){
      console.log(err || 'created' + projecturl);
    });
    projectService.saveProject({
      name: 'Secondary Project',
      description: 'This project is secondary',
      teaser:'What a secondary project',
      featured:true,
      Photos:[{
            title:'Map',
            url: 'Screen-Shot-2013-09-06-at-81536-AM.png',
            caption:'Look a map',
            description: 'This is a map',
            type:'Page',
            order:1
      },{
            title:'Little Spoon',
            url: 'LittleSpoon.png',
            caption:'Little Spoon Sketch Comedy',
            description: 'Aw, how cute',
            type:'Page',
            order:2
      },{
            title:'KT Logo',
            url: 'KTLogoSample.png',
            caption:'This is a logo for a completely different website',
            description: 'Kamino Traveler is a site that fell apart due to poorly attending meetings by me',
            type:'Page',
            order:3
      },{
            title:'Stand up shot',
            url: 'Screen-Shot-2015-06-12-at-100210-AM.png',
            caption:'Troll face stand up ',
            description: 'This guy might do stand up',
            type:'Tile',
            order:2
      },{
            title:'Little Spoon',
            url: 'LittleSpoon.png',
            caption:'Little Spoon Sketch Comedy',
            description: 'Aw, how cute',
            type:'Tile',
            order:3
      }]
    }, function(err, projecturl){
      console.log(err || 'created' + projecturl);
    });
    userService.createUser({username:config.adminusername,password:config.adminpassword}, function(error, response){
      if(error){
        console.error(error);
      }
    });