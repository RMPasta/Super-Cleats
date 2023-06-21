import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTeamsThunk } from '../../store/team';
import './Teams.css'

export default function Teams() {
    const dispatch = useDispatch();
    const teams = useSelector(state => state.team.teams);

    useEffect(() => {
        dispatch(getTeamsThunk())
    }, [dispatch]);

    if (!teams) return <h1>...Loading</h1>

  return (
    <div className='team-gallery'>
            <h5>Supported Teams</h5>
        <div className='badge-gallery scrollable-x'>
            {teams.map((team) => (
                <div key={team.id} className='team-card' title={team.name}>
                    <img className='team-img' src={team.badge_img} alt={team.name} />
                    {/* <div>{team.name}</div> */}
                </div>
            ))}
        </div>
    </div>
  )
}
