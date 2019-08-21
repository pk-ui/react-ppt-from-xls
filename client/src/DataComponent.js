import ReactGoogleSheets from 'react-google-sheets';
import * as Constants from './Constants'
import React, { Component } from 'react';
import './App.css';
import Player from './Player.js'

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
      playerProfile.bidTeamName = playersData[i][32];
      playerProfile.bidPlaced = playersData[i][33];
      playerProfile.mtplTeams = this.populateTeams(mtplTeams);
      playerProfile.teamOptions = this.teamOptions(playerProfile.id, mtplTeams);
      playerProfile.lockPrice = playerProfile.status != 'Sold' ? false : true;
      playerProfile.lockMtplTeamName = playerProfile.status != 'Sold' ? false : true;
      playerProfile.isBidSuccess = playerProfile.status != 'Sold' ? false : true;
      playerProfile.isAvailable = playersData[i][34];
      playerProfile.ownerTeam = {};
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
    for (let i = 0; i < teams.length; i++) {
      let teamInfo = {};
      //teamInfo.value = id + '-' + teams[i][0];
      teamInfo.value = teams[i][0];
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
            item.isAvailable === 'Y' ?
              <div className="paddingPlayer">
                <Player item={item} id={key} updateCell={this.props.updateCell} />
              </div>
              : ""
          ) : 'loading...'}
        </ReactGoogleSheets>

      </div>
    )
  }
}

export default ReactGoogleSheets.connect(DataComponent);
