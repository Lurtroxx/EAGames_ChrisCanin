import { useRecoilState } from 'recoil'
import { TeamData } from '../recoil/atoms'

export const findPlayerTeam = (player) => {
    const [teamData] = useRecoilState(TeamData)
    let team = teamData.find((x) => x.teamId === player.teamId)
    return team?.fullName
}
