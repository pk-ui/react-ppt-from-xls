import React from 'react';
import './App.css';
import bgImage from './bg-image.png';
import retained from './retained.png';
import sold from './sold.png';
import readXlsxFile from 'read-excel-file'
import Integer from 'read-excel-file/commonjs/types/Integer';

var PptxGenJS = require("pptxgenjs");
var pptx;

function App() {
  var xcelData = [];

  const uploadXLSXFile = () => {
    const input = document.getElementById('input')

    input.addEventListener('change', () => {
      readXlsxFile(input.files[0]).then((rows) => {
        rows.forEach(function (value) {
          let playerInfo = {};
          if (playerInfo.playerId !== null) {
            playerInfo.playerName = value[1];
            playerInfo.playerId = value[0];
            playerInfo.teamName = value[4];
            playerInfo.matches = value[5];
            playerInfo.runs = value[6];
            playerInfo.strikeRate = isNumber(value[8]);
            playerInfo.ballsFaced = value[7];
            playerInfo.wickets = value[9];
            playerInfo.economy = isNumber(value[10]);
            playerInfo.bowlOvers = value[12];
            playerInfo.catches = value[17];
            playerInfo.playingRole = playerInfo.wickets ? 'All Rounder' : 'Batting'
            playerInfo.battingAverage = isNumber(value[13]);
            playerInfo.highestScore = value[14];
            playerInfo.bestBowling = ExcelDateToJSDate(value[15]);
            playerInfo.hatTricks = value[16];
            playerInfo.catches = value[17];
            playerInfo.totalPoints = value[18];
            playerInfo.batRank = value[22];
            playerInfo.bowlRank = value[23];
            playerInfo.overallRank = value[24];
            playerInfo.fieldingPoints = value[21];
            playerInfo.isExternalPlayer = value[25];
            playerInfo.isRetainedPlayer = value[26];
            playerInfo.isOwnerPlayer = value[27];
            xcelData.push(playerInfo);
          }
        })
      })
    })
  }

  const ExcelDateToJSDate = (date) => {
    if (date === 0)
      return "-";
    var d = new Date(Math.round((date - 25568) * 86400 * 1000));
    return (d.getMonth() + 1) + "/" + d.getDate();
  }
  const isNumber = (value) => {
    if (isNaN(value)) {
      return value;
    }
    return parseFloat(value).toFixed(2);
  }

  const getBasePrice = (playerRank, price40K, price30K, price20K, price10K) => {
    let basePrice = "";
    if (playerRank >= price10K) {
      basePrice = "$ 10,000 /-";
    } else if (playerRank >= price20K) {
      basePrice = "$ 20,000 /-";
    } else if (playerRank >= price30K) {
      basePrice = "$ 30,000 /-";
    } else if (playerRank >= price40K) {
      basePrice = "$ 40,000 /-";
    } else {
      basePrice = "$ 50,000 /-";
    }
    return basePrice;
  }
  const generatePPT = () => {
    var playersCount = xcelData.length;
    var price50K = 1;
    var price40K = price50K + Math.ceil(((playersCount - 1) * 10) / 100);
    var price30K = price40K + Math.ceil(((playersCount - 1) * 15) / 100);
    var price20K = price30K + Math.ceil(((playersCount - 1) * 20) / 100);
    var price10K = price20K + Math.ceil(((playersCount - 1) * 25) / 100);
    console.log('50K : ' + price50K + ' ;40K : ' + price40K + ' ;30K : ' + price30K
      + ' ;20K : ' + price20K + ' ;10K : ' + price10K);
    pptx = new PptxGenJS();
    for (let i = 0; i < playersCount; i++) {

      let playerInfo = xcelData[i];
      if (playerInfo.playerId !== 'player_id') {
        var slide = pptx.addNewSlide();
        var centerAlignOpts = { x: 1.0, y: 0.2, fontSize: 40, color: '000000', h: 1.4, align: 'center', bold: true };
        var playerRankOpts = { x: 4.0, y: 1.8, fontSize: 16, color: 'FFFF00', bold: true };
        var playerBasePriceOpts = { x: 6.7, y: 0.3, fontSize: 20, color: '000000', bold: true, w:3.3, fill: 'FFFF00' };
        var playerIdOpts = { x: 4.0, y: 2.1, fontSize: 16, color: 'FFFF00', bold: true };
        var teamNameOpts = { x: 4.0, y: 2.4, fontSize: 16, color: 'FFFF00', bold: true };
        var playingRoleOpts = { x: 4.0, y: 2.7, fontSize: 16, color: 'FFFF00', bold: true };

        let matchesX = 1.7;
        let runsX = 3.4;
        let wicketsX = 5.1;

        if (playerInfo.wickets) {
          matchesX = 0.1;
          runsX = 0.7;
          wicketsX = 5.5;
        } else {
          matchesX = 2.4;
          runsX = 3.7;
        }

        slide.addImage({ path: bgImage, x: 0, y: 0, w: 10, h: 5.60 })

        if (playerInfo.isRetainedPlayer === 'Y')
          slide.addImage({ path: retained, x: 1, y: 2.0, w: 2.2, h: 1 })

        if (playerInfo.isOwnerPlayer === 'Y')
          slide.addImage({ path: sold, x: 1.2, y: 2.0, w: 2, h: 1 })

        if (playerInfo.isExternalPlayer) {
          // External Player
          slide.addText('Associated with Other MN Cricket League(s)', { x: 0, y: 0, fontSize: 10, color: 'C0C0C0', h: 0.3, w: 10, align: 'center', bold: true, fill: 'B22222' });
          slide.addText('Associated with Other MN Cricket League(s)', { x: 0, y: 5.33, fontSize: 10, color: 'C0C0C0', h: 0.3, w: 10, align: 'center', bold: true, fill: 'B22222' });
        }

        // Player Name
        slide.addText(playerInfo.playerName, centerAlignOpts);

        // Overall Rank
        slide.addText('Base Price: ' + getBasePrice(playerInfo.overallRank, price40K, price30K, price20K, price10K), playerBasePriceOpts);

        // Overall Rank
        slide.addText('Overall Rank: ' + playerInfo.overallRank, playerRankOpts);

        // Player ID
        slide.addText('Player ID: ' + playerInfo.playerId, playerIdOpts);
        // Team Name

        slide.addText('Team Name: ' + playerInfo.teamName, teamNameOpts);
        // Playing Role

        slide.addText('Playing Role: ' + playerInfo.playingRole, playingRoleOpts);

        // Batting Stats
        slide.addText('Batting Stats', { x: runsX, y: 3.5, w: 4.6, fontSize: 16, fill: 'FF8C00', color: '000000', bold: true });

        // Batting Style
        //slide.addText('Batting Role: ' + playerInfo.battingRole, battingRoleOpts);
        // Bowling Style
        //slide.addText('Bowling Role: ' + playerInfo.bowlingRole, bowlingRoleOpts);

        let tableHeaderOptions = { valign: 't', align: 'c', fontFace: 'Arial', border: { pt: 0 } };
        let tableRowOptions = { valign: 't', align: 'c', fontFace: 'Arial', border: { pt: 0 } };

        // Matches
        var matchRows = [
          [
            { text: '(M)', options: tableHeaderOptions }
          ]
        ];
        let dynamicMatchRows = [{ text: playerInfo.matches, options: tableRowOptions }];
        matchRows.push(dynamicMatchRows);

        var matchesTabOpts = { x: matchesX, y: 3.8, w: 0.5, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };
        slide.addTable(matchRows, matchesTabOpts);

        // Runs
        var runsRows = [
          [
            { text: 'Rank', options: tableHeaderOptions },
            { text: 'Runs', options: tableHeaderOptions },
            { text: 'S/R', options: tableHeaderOptions },
            { text: 'HS', options: tableHeaderOptions },
            { text: 'Ave', options: tableHeaderOptions },
            { text: '(C)', options: tableHeaderOptions }
          ]
        ];
        var dynamicRunsRows = [
          { text: playerInfo.batRank, options: tableRowOptions },
          { text: playerInfo.runs, options: tableRowOptions },
          { text: playerInfo.strikeRate, options: tableRowOptions },
          { text: playerInfo.highestScore, options: tableRowOptions },
          { text: playerInfo.battingAverage, options: tableRowOptions },
          { text: playerInfo.catches, options: tableRowOptions }
        ];

        runsRows.push(dynamicRunsRows);
        //runsRows.push([{ text: 'S/R : ' + playerInfo.strikeRate, options: tableRowOptions }]);
        var runsTabOpts = { x: runsX, y: 3.8, w: 4.6, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };
        slide.addTable(runsRows, runsTabOpts);

        if (playerInfo.playingRole !== 'Batting') {
          // Batting Stats
          slide.addText('Bowling Stats', { x: wicketsX, y: 3.5, w: 4.3, fontSize: 16, fill: 'FF8C00', color: '000000', bold: true });
          // Wickets
          var wicketsRows = [
            [
              { text: 'Rank', options: tableHeaderOptions },
              { text: '(W)', options: tableHeaderOptions },
              { text: '(O)', options: tableHeaderOptions },
              { text: 'Econ', options: tableHeaderOptions },
              { text: 'BB', options: tableHeaderOptions },
              { text: 'H/T', options: tableHeaderOptions },
            ]
          ];
          let dynamicWicketsRows = [
            { text: playerInfo.bowlRank, options: tableRowOptions },
            { text: playerInfo.wickets, options: tableRowOptions },
            { text: playerInfo.bowlOvers, options: tableRowOptions },
            { text: playerInfo.economy, options: tableRowOptions },
            { text: playerInfo.bestBowling, options: tableRowOptions },
            { text: playerInfo.hatTricks, options: tableRowOptions },
          ];
          wicketsRows.push(dynamicWicketsRows);
          var wicketsTabOpts = { x: wicketsX, y: 3.8, w: 4.3, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };

          slide.addTable(wicketsRows, wicketsTabOpts);
        }
      }
    }
    pptx.save();

    console.log('Complete');
  }

  return (
    <div >
      <div>
        <div>
          <h1 ><center>MTPL Players Slide Generator</center></h1>
        </div>
        <div>
          <center>
            <h1>
              <input type="file" id="input" onClick={uploadXLSXFile} />
            </h1>
          </center>
        </div>

        <div>

          <center>
            <h1>
              <button onClick={generatePPT}>Generate MTPL Slides</button>
            </h1>
          </center>
        </div>
      </div>
    </div>
  );
}

export default App;
