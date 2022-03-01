import axios from 'axios'

export const fetchData = async () => {
    const players = await axios.get(
        'http://data.nba.net/10s/prod/v1/2021/players.json',
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    )
    const teams = await axios.get(
        'https://data.nba.net/data/10s/prod/v1/2021/teams.json',
        {
            headers: {
                'content-type': 'application/json',
            },
        }
    )
    return { players, teams }
}
