/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const express = require('express');

const { getPublicToken } = require('./common/oauth');

let router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b55e94922e7906",
  password: "094305db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// GET /api/forge/oauth/token - generates a public access token (required by the Forge viewer).
router.get('/token', async (req, res, next) => {
    try {
        const token = await getPublicToken();
        console.log("*************token******" + token.access_token + "******" + token.expires_in);
        res.json({
            access_token: token.access_token,
            expires_in: token.expires_in    
        });
  
        } catch(err) {
        next(err);
        }
        });

module.exports = router;
