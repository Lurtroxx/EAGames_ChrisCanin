export const addPlayer = (player, newTeam, setNewTeam) => {
    let index = newTeam.findIndex((p) => p.personId == player.personId)
    if (index > -1) {
        alert('player already exists on this team')
    } else {
        // ANCHOR Note for reader: Was not sure if I should remove the players with no position, or remove them from the list, instead there is just validation on the add to prevent you from adding players with no assigned positions.
        if (!['G', 'C', 'F'].includes(player.pos.substring(0, 1))) {
            alert(
                `player ${player.firstName} ${player.lastName} has no position!`
            )
        } else {
            let position = player.pos.substring(0, 1)
            let positionsTaken = newTeam.filter(
                (p) => p.pos.substring(0, 1) == position
            )
            let teamErrorMessage = ''
            switch (position) {
                case 'G':
                    teamErrorMessage =
                        positionsTaken.length > 1
                            ? 'You have too many Guards!'
                            : ''
                    break
                case 'F':
                    teamErrorMessage =
                        positionsTaken.length > 1
                            ? 'You have too many Forwards!'
                            : ''
                    break
                case 'C':
                    teamErrorMessage =
                        positionsTaken.length > 0
                            ? 'You can only have one Center!'
                            : ''
                    break
                default:
                    alert('error, bad position')
            }

            if (teamErrorMessage !== '') {
                alert(teamErrorMessage)
            } else setNewTeam([...newTeam, player])
        }
    }
}
