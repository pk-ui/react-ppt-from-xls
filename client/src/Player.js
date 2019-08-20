import React, { useState, Component } from 'react';
import owner from './images/owner.png';
import retained from './images/retained.png';
import sold from './images/sold.png';
import Select from 'react-select';
import './App.css';

function Player(props) {

    let [player, setPlayer] = useState(props.item);

    return (
        <div key={props.id} className="AuctionBody">

            {player.isExternalPlayer === 'TRUE' ? <div className="externalPlayer"> Associated with Other MN Cricket League(s) </div> : ''}

            <div>
                <span className="basePrice">Base Price : {player.basePrice}</span>
                <span className="lockInfo">
                    <label>
                        <input className="checkBox" type="checkbox" checked={player.lockPrice} onChange={(event) => {
                            setPlayer({ ...player, "lockPrice": event.target.checked });
                        }} />
                        <span>Lock Price</span>
                    </label>
                    <span>&nbsp;</span>
                    <label>
                        <input className="checkBox" type="checkbox" checked={player.lockMtplTeamName} onChange={(event) => {
                            setPlayer({ ...player, "lockMtplTeamName": event.target.checked, ["mtplTeamName"]: player.mtplTeamName });
                        }} />
                        <span>Lock Team</span>
                    </label>
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
            <div className="holdMTPLSpace" />

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
                    {player.lockPrice ? <label>
                        {player.purchasePrice}
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
                    <div className="nextRow"></div>
                    {player.lockMtplTeamName ?
                        <div>{player.mtplTeamName} </div> :
                        <div>
                            <div>
                                <Select className="mtplTeamSelectBox" name="mtplTeamName"
                                    defaultValue={player.mtplTeamName.value}
                                    value={player.mtplTeamName.value}
                                    options={player.teamOptions}
                                    onChange={(selectedOption) => {
                                        console.log(selectedOption);
                                        player.mtplTeamName = selectedOption;
                                        setPlayer({ ...player, ["mtplTeamName"]: selectedOption.label });
                                    }}
                                />

                            </div>
                            <div className="nextRow"></div>
                        </div>
                    }
                    {player.lockMtplTeamName && player.lockPrice && player.status !== 'Sold' ?
                        <div>
                            <button type="submit" className="button" onClick={() => {
                                let row = parseInt(player.id) + 1
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

                            }}> Submit </button>
                        </div> : ''
                    }
                </div>
            }
            <div className="holdEmptySpace" />
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