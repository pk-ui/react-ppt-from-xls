import ReactGoogleSheets from 'react-google-sheets';
import * as Constants from './Constants'
import React, { Component } from 'react';
import './App.css';
import Player from './Player.js'
import Select from 'react-select';

class DataComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sheetLoaded: false
    }
  }

  handleChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);
  };

  populatePlayerInfo = (players, mtplTeams) => {
    let returnData = [];
    let playersData = players.data;
    for (let i = 0; i < playersData.length; i++) {
      let playerProfile = {};
      playerProfile.playerId = playersData[i][0];
      playerProfile.name = playersData[i][1];
      playerProfile.emailId = playersData[i][2];
      playerProfile.mobileNo = playersData[i][3];
      playerProfile.perTeamPlayerCount = playersData[i][4];
      playerProfile.mtbcTeamName = playersData[i][5];
      playerProfile.mtplTeamName = playersData[i][6];
      playerProfile.basePrice = playersData[i][7];
      playerProfile.purchasePrice = playersData[i][8];
      playerProfile.status = playersData[i][9];
      playerProfile.isExternalPlayer = playersData[i][10];
      playerProfile.isRetainedPlayer = playersData[i][11];
      playerProfile.isOwnerPlayer = playersData[i][12];
      playerProfile.overallRank = playersData[i][13];
      playerProfile.id = playersData[i][13];
      playerProfile.batRank = playersData[i][14];
      playerProfile.bowlRank = playersData[i][15];
      playerProfile.matches = playersData[i][16];
      playerProfile.runs = playersData[i][17];
      playerProfile.ballsFaced = playersData[i][18];
      playerProfile.batSR = playersData[i][19];
      playerProfile.wickets = playersData[i][20];
      playerProfile.economy = playersData[i][21];
      playerProfile.bowlOvers = playersData[i][22];
      playerProfile.batAverage = playersData[i][23];
      playerProfile.highestScore = playersData[i][24];
      playerProfile.bestBowl = playersData[i][25];
      playerProfile.hatTrick = playersData[i][26];
      playerProfile.catches = playersData[i][27];
      playerProfile.totalPoints = playersData[i][28];
      playerProfile.batPoints = playersData[i][29];
      playerProfile.bowlPoints = playersData[i][30];
      playerProfile.fieldPoints = playersData[i][31];
      playerProfile.mtplTeams = this.populateTeams(mtplTeams);
      playerProfile.teamOptions = this.teamOptions(playerProfile.id, mtplTeams);
      returnData.push(playerProfile);
    }
    return returnData;
  };

  populateTeams = (mtplTeams) => {
    let returnData = [];
    let teams = mtplTeams.data;
    for (let i = 3; i < teams.length; i++) {
      let teamInfo = {};
      teamInfo.name = teams[i][0];
      teamInfo.ownerName = teams[i][1];
      teamInfo.isOwnerPlayer = teams[i][2];
      teamInfo.amount = teams[i][3];
      teamInfo.amountSpent = teams[i][4];
      teamInfo.amountBalance = teams[i][5];
      teamInfo.playerCount = teams[i][6];
      teamInfo.remainingPlayerCount = teams[i][7];
      teamInfo.maxAllowedBidOnNextPlayer = teams[i][8];
      teamInfo.ownerPlayerId = teams[i][9];
      teamInfo.retainedPlayerId = teams[i][10];
      returnData.push(teamInfo);
    }
    return returnData;
  };

  getAuctionData = (xcelData) => {
    let auctionData = {};
    for (let i = 0; i < xcelData.length; i++) {
      switch (xcelData[i].name) {
        case 'MTPL Players':
          auctionData.mtplPlayers = xcelData[i];
          break;
        case 'MTPL Teams':
          auctionData.mtplTeams = xcelData[i];
          break;
        default:
          break;
      }
    }
    return auctionData;
  };

  retrieveAuctionData = () => {
    let xcelData = this.props.getSheetsData();
    console.log("No of Sheets : ", xcelData.length);
    let auctionWebData = this.getAuctionData(xcelData);
    console.log('MTPL Players : ', auctionWebData.mtplPlayers);
    console.log('MTPL Teams : ', auctionWebData.mtplTeams);

    let returnData = {};

    returnData.players = this.populatePlayerInfo(auctionWebData.mtplPlayers, auctionWebData.mtplTeams);
    console.log("MTPL Players : ", returnData.players);
    return returnData;
  };

  teamOptions = (id, mtplTeams) => {
    let returnData = [];
    let teams = mtplTeams.data;
    for (let i = 3; i < teams.length; i++) {
      let teamInfo = {};
      teamInfo.value = id + '-' + teams[i][0];
      teamInfo.label = teams[i][0];
      returnData.push(teamInfo);
    }
    return returnData;
  };

  render() {

    return (
      <div>
        <ReactGoogleSheets
          clientId={Constants.CLIENT_ID}
          apiKey={Constants.API_KEY}
          spreadsheetId={Constants.MTPL_MENS_SPREADSHEET_ID}
          afterLoading={() => this.setState({ sheetLoaded: true })}
        >
          {this.state.sheetLoaded ? this.retrieveAuctionData().players.map((item, key) =>

            <div key={key} className="AuctionBody">
              <div>
                <button onClick={() => { }}>Previous</button>

                <button onClick={() => { }}>Next</button>
              </div>

              {item.isExternalPlayer === 'TRUE' ? <div className="externalPlayer"> Associated with Other MN Cricket League(s) </div> : ''}

              <div className="basePrice">
                <span>Base Price : {item.basePrice}</span>
              </div>
              <div className="playerName">
                <span>{item.name}</span>
              </div>
              <div className="playerInfo">
                <span>Rank: {item.overallRank}</span>
                <span>MTBC Team: {item.mtbcTeamName}</span>

              </div>
              <div className="holdMTPLSpace" />
              <div className="mtplPlayerInfo">
                {item.mtplTeamName ?
                  <span>MTPL Team: {item.mtplTeamName} </span> :
                  <div>
                    <div>
                      <label>
                        Price:
                  </label>
                      <input type="text" className="textBox" />
                    </div>
                    <div className="nextRow"></div>
                    <div>
                      <label>
                        MTPL Team:
                  </label>
                      <Select className="mtplTeamInfo"
                        value={item.mtplTeamName}
                        onChange={this.handleChange}
                        options={item.teamOptions}
                      />
                    </div>
                    <div className="nextRow"></div>
                    <div>
                      <button type="submit" className="button" onClick={() => {
                        this.props.updateCell(
                          'MTPL Players', // sheetName
                          'G', // column
                          4, // row
                          'Sholay - 11', // value
                          null, // successCallback
                          (error) => {
                            console.log('error', error)
                          } // errorCallback
                        );
                        this.props.updateCell(
                          'MTPL Players', // sheetName
                          'I', // column
                          4, // row
                          '50000', // value
                          null, // successCallback
                          (error) => {
                            console.log('error', error)
                          } // errorCallback
                        );
                        
                      }}> Submit </button>
                    </div>
                  </div>
                }
              </div>
              <div className="holdEmptySpace" />
              <div className="table">
                <table>
                  <tr>
                    <td className="td">
                      Matches
                    </td>
                    <td className="td">
                      &nbsp;
                    </td>
                    <td className="td">
                      Rank
                    </td>
                    <td className="td">
                      Runs
                    </td>
                    <td className="td">
                      S/R
                    </td>
                    <td className="td">
                      HS
                    </td>
                    <td className="td">
                      Ave
                    </td>
                    <td className="td">
                      (C)
                    </td>
                    <td className="td">
                      &nbsp;
                    </td>
                    <td className="td">
                      Rank
                    </td>
                    <td className="td">
                      (W)
                    </td>
                    <td className="td">
                      (O)
                    </td>
                    <td className="td">
                      Econ
                    </td>
                    <td className="td">
                      BB
                    </td>
                    <td className="td">
                      H/T
                    </td>
                  </tr>
                  <tbody>
                    <tr>
                      <td className="td">
                        {item.matches}
                      </td>
                      <td className="td">
                        &nbsp;
                    </td>
                      <td className="td">
                        {item.batRank}
                      </td>
                      <td className="td">
                        {item.runs}
                      </td>
                      <td className="td">
                        {item.batSR}
                      </td>
                      <td className="td">
                        {item.highestScore}
                      </td>
                      <td className="td">
                        {item.batAverage}
                      </td>
                      <td className="td">
                        {item.catches}
                      </td>
                      <td className="td">
                        &nbsp;
                    </td>
                      <td className="td">
                        {item.bowlRank}
                      </td>
                      <td className="td">
                        {item.wickets}
                      </td>
                      <td className="td">
                        {item.bowlOvers}
                      </td>
                      <td className="td">
                        {item.economy}
                      </td>
                      <td className="td">
                        {item.bestBowl}
                      </td>
                      <td className="td">
                        {item.hatTrick}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          ) : 'loading...'}
        </ReactGoogleSheets>

      </div>
    )
  }
}

export default ReactGoogleSheets.connect(DataComponent);
