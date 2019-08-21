import React, { useState, Component } from 'react';
import owner from './images/owner.png';
import retained from './images/retained.png';
import sold from './images/sold.png';
import Select from 'react-select';
import './App.css';
import Tabletop from 'tabletop';
import * as Constants from './Constants'
import numeral from 'numeral';

function Player(props) {

    let [player, setPlayer] = useState(props.item);
    let [loading, setLoading] = useState(false);

    function isPriceError(purchasePrice, basePrice) {
        let purchasePriceValue = numeral(purchasePrice).value();
        let basePriceValue = numeral(basePrice).value();
        if (purchasePriceValue < basePriceValue) {
            alert('Purchase Price is less than the Base Price');
            return true;
        }
        
        return false;
    }

    function isMTPLTeamSelectionError(mtplTeamName) {
        if (!mtplTeamName) {
            alert('MTPL Team Not Selected');
            return true;
        }
        return false;
    }
    function handleBid(e) {
        let purchasePriceValue = numeral(player.purchasePrice).value();
        let basePriceValue = numeral(player.basePrice).value();

        if (!isPriceError(player.purchasePrice, player.basePrice) && !isMTPLTeamSelectionError(player.mtplTeamName)) {

            let row = parseInt(player.id) + 1;
            props.updateCell(
                'MTPL Players', // sheetName
                'AG', // column
                row, // row
                player.mtplTeamName, // value
                (success) => {
                    props.updateCell(
                        'MTPL Players', // sheetName
                        'AH', // column
                        row, // row
                        'Placed', // value
                        (success) => {
                            Tabletop.init({
                                key: Constants.MTPL_MENS_SPREADSHEET_ID,
                                callback: googleData => {
                                    let playerData = googleData["MTPL Players"].elements;
                                    let mtplTeamData = googleData["MTPL Teams"].elements;
                                    const mtplTeamName = mtplTeamData.filter((team) => {
                                        if (team.franchiseTeam === player.mtplTeamName) {
                                            return team;
                                        }
                                    }
                                    )[0];
                                    console.log("Player ID: ", player);
                                    let id = parseInt(player.id)-1;
                                    let mtbcTeamPlayerCount = playerData[id].perTeamPlayerCount;

                                    let maxAllowedBidOnNextPlayerValue = numeral(mtplTeamName.maxAllowedBidOnNextPlayer).value();
                                    let remainingPlayerCount = numeral(mtplTeamName.remainingPlayerCount).value();
                                    if (purchasePriceValue >= basePriceValue && purchasePriceValue <= maxAllowedBidOnNextPlayerValue 
                                        && mtbcTeamPlayerCount <= 3 && remainingPlayerCount > 0 && purchasePriceValue >= basePriceValue) {
                                        setPlayer({ ...player, "isBidSuccess": true });
                                    } else {
                                        props.updateCell(
                                            'MTPL Players', // sheetName
                                            'AG', // column
                                            row, // row
                                            '', // value
                                            null, // successCallback
                                            (error) => {
                                                console.log('error', error)
                                            } // errorCallback
                                        );
                                        props.updateCell(
                                            'MTPL Players', // sheetName
                                            'AH', // column
                                            row, // row
                                            '', // value
                                            null, // successCallback
                                            (error) => {
                                                console.log('error', error)
                                            } // errorCallback
                                        );

                                        if (purchasePriceValue < basePriceValue) {
                                            alert('Purchase Price is less than the Base Price');
                                            return true;
                                        }

                                        if(mtbcTeamPlayerCount > 3) {
                                            alert('Max Number of Players limit reached for the Team: ' + player.mtbcTeamName);
                                            return;
                                        }
                                        if(purchasePriceValue > maxAllowedBidOnNextPlayerValue) {
                                            alert('Purchase Price is more than the maxAllowed Bid for this Player');
                                            return;
                                        }
                                        if(purchasePriceValue < basePriceValue) {
                                            alert('Purchse Price is less than Base Price');
                                            return;
                                        }
                                        if(remainingPlayerCount <= 0) {
                                            alert('Max no. of Players Selected already for the Team: ' + player.mtplTeamName);
                                            return;
                                        }
                                    }   
                                },
                                simpleSheet: false
                            });
                        }, // successCallback
                        (error) => {
                            console.log('error', error)
                        } // errorCallback
                    );
                }, // successCallback
                (error) => {
                    console.log('error', error)
                } // errorCallback
            );

        }

    }

    function handleSubmit() {
        let row = parseInt(player.id) + 1;
        props.updateCell(
            'MTPL Players', // sheetName
            'G', // column
            row, // row
            player.mtplTeamName, // value
            null, // successCallback
            (error) => {
                console.log('error', error)
            } // errorCallback
        );
        props.updateCell(
            'MTPL Players', // sheetName
            'I', // column
            row, // row
            player.purchasePrice, // value
            null, // successCallback
            (error) => {
                console.log('error', error)
            } // errorCallback
        );
        setPlayer({ ...player, 'status': 'Sold' });
    }

    return (

        <div key={props.id} className="AuctionBody">
            {player.isExternalPlayer === 'TRUE' ? <div className="externalPlayer"> Associated with Other MN Cricket League(s) </div> : ''}

            <div>
                <span className="basePrice">Base Price : {player.basePrice} /-</span>
                <span className="lockInfo">
                    {false && !loading && player.purchasePrice ?
                        <label>
                            <input className="checkBox" type="checkbox" checked={player.lockPrice} onChange={(event) => {
                                if (!isPriceError(player.purchasePrice, player.basePrice)) {
                                    setPlayer({ ...player, "lockPrice": event.target.checked, "isBidSuccess": false });
                                }
                            }} />
                            <span>Lock Price</span>
                        </label>
                        : ''}
                    <span>&nbsp;</span>
                    {!loading && player.mtplTeamName &&
                        <label>
                            <input className="checkBox" type="checkbox" checked={player.lockMtplTeamName} onChange={(event) => {
                                setPlayer({ ...player, "lockMtplTeamName": event.target.checked, "mtplTeamName": player.mtplTeamName, "isBidSuccess": false });
                            }}
                            />
                            <span>Lock</span>
                        </label>
                    }
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </span>
            </div>

            <div className="playerName">
                <span>{player.name}</span>
            </div>
            <div className="playerInfo">
                <div>
                    <div className="playerInfo"><span>Rank: {player.overallRank}</span></div>
                    <div className="playerInfo whiteColor"><span>MTBC Team: {player.mtbcTeamName}</span></div>
                </div>
            </div>

            {player.ownerTeam.franchiseTeam ? <div className="holdEmptySpace" /> : <div className="holdMoreEmptySpace" />}

            {player.status === 'Sold' ?
                <div className="soldCarousel">
                    <div className="sold">
                        {player.isRetainedPlayer === 'TRUE' ? <img src={retained} className="soldImage" /> : ''}
                        {player.isOwnerPlayer === 'TRUE' ? <img src={owner} className="soldImage" /> : ''}
                        {player.status === 'Sold' ? <img src={sold} className="soldImage" /> : ''}
                        <div>
                            <span>Price : {player.purchasePrice}</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>{player.mtplTeamName}</span>
                        </div>
                    </div>
                </div>
                : <div className="mtplPlayerInfo">
                    {player.lockMtplTeamName ?
                        <div>{player.mtplTeamName} </div> :
                        <div>
                            <div>
                                <Select className="mtplTeamSelectBox" name="mtplTeamName"
                                    defaultValue={player.mtplTeamName.value}
                                    value={player.mtplTeamName.value}
                                    options={player.teamOptions}
                                    onChange={(selectedOption) => {
                                        setLoading(true);
                                        player.mtplTeamName = selectedOption;

                                        Tabletop.init({
                                            key: Constants.MTPL_MENS_SPREADSHEET_ID,
                                            callback: googleData => {
                                                let mtplTeamData = googleData["MTPL Teams"].elements;
                                                const mtplTeam = mtplTeamData.filter((team) => {
                                                    if (team.franchiseTeam === selectedOption.value) {
                                                        return team;
                                                    }
                                                }
                                                )[0];

                                                setPlayer({ ...player, ["mtplTeamName"]: selectedOption.label, ["ownerTeam"]: mtplTeam });
                                                setLoading(false);
                                            },
                                            simpleSheet: false
                                        });

                                    }}
                                />

                            </div>
                            <div className="nextRow"></div>
                        </div>
                    }
                    {loading && <img src="http://giphygifs.s3.amazonaws.com/media/m2NEkszhRmZZ6/giphy.gif" />}
                    <div className="nextRow"></div>

                    { // player.lockPrice 
                        player.lockMtplTeamName ? <label>
                        PRICE: {player.purchasePrice}
                    </label>
                        :
                        <div>
                            <div>
                                <label>Price:  </label>
                                <input type="text" name="purchasePrice" className="textBox" value={player.purchasePrice} onChange={(event) => {
                                    setPlayer({ ...player, [event.target.name]: event.target.value });
                                }} />
                            </div>

                        </div>

                    }



                    <div>
                        {player.status !== 'Sold' && !player.lockMtplTeamName && //!player.lockPrice &&
                            player.ownerTeam.franchiseTeam ? <div>
                                <div class="divTable ownerTableStyle" >
                                    <div class="divTableBody">
                                        <div class="divTableRow">
                                            <div class="divTableCell">Team</div>
                                            <div class="divTableCell">Balance</div>
                                            <div class="divTableCell">Max Allowed Bid</div>
                                            <div class="divTableCell">Amount Spent</div>
                                            <div class="divTableCell">Players Count</div>
                                            <div class="divTableCell">Rem. Pl Count</div>
                                        </div>
                                        <div class="divTableRow">
                                            <div class="divTableCell">{player.ownerTeam.franchiseTeam}</div>
                                            <div class="divTableCell">{player.ownerTeam.CurrentBalance}</div>
                                            <div class="divTableCell">{player.ownerTeam.maxAllowedBidOnNextPlayer}</div>
                                            <div class="divTableCell">{player.ownerTeam.amountSpent}</div>
                                            <div class="divTableCell">{player.ownerTeam.playerCount}</div>
                                            <div class="divTableCell">{player.ownerTeam.remainingPlayerCount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div></div>
                        }
                    </div>
                    {player.lockMtplTeamName //&& player.lockPrice 
                        && !player.isBidSuccess && player.status !== 'Sold' ?
                        <div>
                            <button type="submit" className="button" onClick={handleBid}> Place Bid </button>
                        </div> : ''
                    }

                    {player.lockMtplTeamName //&& player.lockPrice 
                        && player.isBidSuccess && player.status !== 'Sold' ?
                        <div>
                            <button type="submit" className="button" onClick={handleSubmit}> Submit </button>
                        </div> : ''
                    }
                </div>
            }

            {player.ownerTeam.franchiseTeam ? <div className="holdEmptySpace" /> : <div className="holdMoreEmptySpace" />}

            <div className="table">
                <table >
                    <tr className="tableHeader">
                        <td className="td" colSpan="2">
                        </td>
                        <td className="td" colSpan="7">
                            Batting Stats
                        </td>
                        <td cclassName="td" colSpan="7">
                            Bowling Stats
                        </td>
                    </tr>
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
                                {player.matches}
                            </td>
                            <td className="td">
                                &nbsp;
              </td>
                            <td className="td">
                                {player.batRank}
                            </td>
                            <td className="td">
                                {player.runs}
                            </td>
                            <td className="td">
                                {player.batSR}
                            </td>
                            <td className="td">
                                {player.highestScore}
                            </td>
                            <td className="td">
                                {player.batAverage}
                            </td>
                            <td className="td">
                                {player.catches}
                            </td>
                            <td className="td">
                                &nbsp;
              </td>
                            <td className="td">
                                {player.bowlRank}
                            </td>
                            <td className="td">
                                {player.wickets}
                            </td>
                            <td className="td">
                                {player.bowlOvers}
                            </td>
                            <td className="td">
                                {player.economy}
                            </td>
                            <td className="td">
                                {player.bestBowl}
                            </td>
                            <td className="td">
                                {player.hatTrick}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Player;