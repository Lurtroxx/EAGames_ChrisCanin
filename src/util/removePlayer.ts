export const removePlayer = (player, newTeam, setNewTeam) => {
    let index = newTeam.findIndex((p) => p.personId == player.personId)
    let tempArray = [...newTeam]
    tempArray.splice(index, 1)
    setNewTeam(tempArray)
}
