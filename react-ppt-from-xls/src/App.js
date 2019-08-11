import React from 'react';
import './App.css';
import bgImage from './bg-image.png'
import readXlsxFile from 'read-excel-file'

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
          playerInfo.catches = null;
          playerInfo.playingRole = playerInfo.wickets ? 'All Rounder' : 'Batting'
          playerInfo.battingAverage = isNumber(value[13]);
          playerInfo.highestScore = value[14];
          xcelData.push(playerInfo);
        })

      })
    })
  }

  const isNumber = (value) => {
    if(isNaN(value)) {
      return value;
    } 
    return parseFloat(value).toFixed(2);
  }
  const generatePPT = () => {
    pptx = new PptxGenJS();
    for (let i = 0; i < xcelData.length; i++) {

      let playerInfo = xcelData[i];
      if (playerInfo.playerId !== 'player_id') {
        var slide = pptx.addNewSlide();
        var centerAlignOpts = { x: 1.0, y: 0.2, fontSize: 40, color: '000000', h: 1.4, align: 'center', bold: true };
        var playerIdOpts = { x: 4.0, y: 2.1, fontSize: 16, color: 'FFFF00', bold: true };
        var teamNameOpts = { x: 4.0, y: 2.4, fontSize: 16, color: 'FFFF00', bold: true };
        var playingRoleOpts = { x: 4.0, y: 2.7, fontSize: 16, color: 'FFFF00', bold: true };
        var battingRoleOpts = { x: 4.0, y: 3.0, fontSize: 16, color: 'FFFF00', bold: true };
        var bowlingRoleOpts = { x: 4.0, y: 3.3, fontSize: 16, color: 'FFFF00', bold: true };

        let matchesX = 1.7;
        let runsX = 3.4;
        let wicketsX = 5.1;
        let catchesX = 6.8;

        if (!playerInfo.wickets && !playerInfo.catches) {
          matchesX = 2.4;
          runsX = 4.7;
        } else if (!playerInfo.catches) {
          matchesX = 0.5;
          runsX = 2.5;
          wicketsX = 6.2;
        }

        slide.addImage({ path: bgImage, x: 0, y: 0, w: 10, h: 5.65 })

        // Player Name
        slide.addText(playerInfo.playerName, centerAlignOpts);

        // Player ID
        slide.addText('Player ID: ' + playerInfo.playerId, playerIdOpts);
        // Team Name

        slide.addText('Team Name: ' + playerInfo.teamName, teamNameOpts);
        // Playing Role

        slide.addText('Playing Role: ' + playerInfo.playingRole, playingRoleOpts);

        // Batting Style
        //slide.addText('Batting Role: ' + playerInfo.battingRole, battingRoleOpts);
        // Bowling Style
        //slide.addText('Bowling Role: ' + playerInfo.bowlingRole, bowlingRoleOpts);

        let tableHeaderOptions = { valign: 't', align: 'c', fontFace: 'Arial', border:{pt:0} };
        let tableRowOptions = { valign: 't', align: 'c', fontFace: 'Arial', border:{pt:0} };

        // Matches
        var matchRows = [
          [
            { text: 'Matches', options: tableHeaderOptions }
          ]
        ];
        let dynamicMatchRows = [{ text: playerInfo.matches, options: tableRowOptions }];
        matchRows.push(dynamicMatchRows);

        var matchesTabOpts = { x: matchesX, y: 3.5, w: 1.5, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };
        slide.addTable(matchRows, matchesTabOpts);

        // Runs
        var runsRows = [
          [
            { text: 'Runs', options: tableHeaderOptions },
            { text: 'S/R', options: tableHeaderOptions},
            { text: 'HS', options: tableHeaderOptions},
            { text: 'Ave', options: tableHeaderOptions}
          ]
        ];
        let dynamicRunsRows = [{ text: playerInfo.runs, options: tableRowOptions }, 
                               { text: playerInfo.strikeRate , options: tableRowOptions},
                               { text: playerInfo.highestScore, options: tableRowOptions},
                               { text: playerInfo.battingAverage, options: tableRowOptions}
                              ];
        runsRows.push(dynamicRunsRows);
        //runsRows.push([{ text: 'S/R : ' + playerInfo.strikeRate, options: tableRowOptions }]);
        var runsTabOpts = { x: runsX, y: 3.5, w: 3.2, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };
        slide.addTable(runsRows, runsTabOpts);

        if (playerInfo.catches) {
          // Catches
          var catchesRows = [
            [
              { text: 'Catches', options: tableHeaderOptions }
            ]
          ];
          let dynamicCatchesRows = [{ text: playerInfo.catches, options: tableRowOptions }];
          catchesRows.push(dynamicCatchesRows);
          var catchesTabOpts = { x: catchesX, y: 3.5, w: 1.5, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm', bold: true };
          slide.addTable(catchesRows, catchesTabOpts);
        }

        if (playerInfo.playingRole !== 'Batting') {
          // Wickets
          var wicketsRows = [
            [
              { text: 'Wickets', options: tableHeaderOptions },
              { text: 'Overs', options: tableHeaderOptions },
              { text: 'Econ', options: tableHeaderOptions }
            ]
          ];
          let dynamicWicketsRows = [
                                    { text: playerInfo.wickets, options: tableRowOptions },
                                    { text: playerInfo.bowlOvers, options: tableRowOptions },
                                    { text: playerInfo.economy, options: tableRowOptions }
                                   ];
          wicketsRows.push(dynamicWicketsRows);
          var wicketsTabOpts = { x: wicketsX, y: 3.5, w: 3.2, rowH: 0.6, fill: '5A81E0', fontSize: 16, color: 'FFFFFF', valign: 'm' , bold: true};

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
