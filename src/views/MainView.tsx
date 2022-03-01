import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { FilteredData, NewTeam, PlayerData, TeamData } from '../recoil/atoms'
import { PlayerCard, shuffle } from '../../src'
import { fetchData } from '../../src'

export const MainView = () => {
    const [newTeam, setNewTeam] = useRecoilState(NewTeam)
    const [filteredData, setFilteredData] = useRecoilState(FilteredData)
    const [playerData, setPlayerData] = useRecoilState(PlayerData)
    const setTeamData = useSetRecoilState(TeamData)
    const [showTeam, setShowTeam] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [teamCity, setTeamCity] = useState('')

    useEffect(() => {
        const getData = async () => {
            const dataObj = await fetchData()
            setPlayerData(shuffle(dataObj?.players?.data?.league?.standard))
            setFilteredData(dataObj?.players?.data?.league?.standard)
            setTeamData(dataObj?.teams?.data.league.standard)
        }
        if (!playerData) getData()
    }, [playerData])

    const filterPlayers = (position: string) => {
        let results = playerData.filter(
            (x) => x.pos.substring(0, 1) === position
        )
        setFilteredData(results)
    }

    const NewTeamView = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={styles.teamInfo}>
                    <Text style={styles.boldText}>Team Name: {teamName}</Text>
                    <Text style={styles.boldText}>Team City: {teamCity}</Text>
                </View>

                <View style={styles.playerCards}>
                    <ScrollView horizontal={true}>
                        {newTeam.map((player, index) => (
                            <PlayerCard
                                player={player}
                                index={index}
                                onTeam={true}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.teamButtonContainer}>
                    <Button
                        buttonStyle={styles.secondaryButtonStyle}
                        title={'Edit Team'}
                        titleStyle={{ color: 'black' }}
                        onPress={() => {
                            setShowTeam(false)
                        }}
                    />
                    <Button
                        buttonStyle={[
                            styles.secondaryButtonStyle,
                            { marginTop: 10 },
                        ]}
                        title={'Make a New Team'}
                        titleStyle={{ color: 'black' }}
                        onPress={() => {
                            setShowTeam(false)
                            setNewTeam([])
                            setTeamName('')
                            setTeamCity('')
                        }}
                    />
                </View>
            </View>
        )
    }

    if (!playerData) return <View />
    if (showTeam) return <NewTeamView />
    else
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.boldText}>NBA Team Creator!</Text>
                    </View>
                    <View style={styles.inputRow}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Team Name"
                                value={teamName}
                                onChangeText={(val) => setTeamName(val)}
                            />
                            <Input
                                placeholder="Team City"
                                value={teamCity}
                                onChangeText={(val) => setTeamCity(val)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={'Create Team'}
                                onPress={() => setShowTeam(true)}
                                disabled={
                                    newTeam.length !== 5 ||
                                    teamName.length == 0 ||
                                    teamCity.length == 0
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.flatListStyle}>
                        {newTeam.length > 0 ? (
                            <FlatList
                                horizontal={true}
                                data={newTeam}
                                renderItem={({ item, index }) => (
                                    <PlayerCard
                                        player={item}
                                        index={index}
                                        onTeam={true}
                                    />
                                )}
                                keyExtractor={(item, index) => `x${index}`}
                            />
                        ) : (
                            <View style={styles.instructionContainer}>
                                <Text style={{ textAlign: 'center' }}>
                                    Press a player to start your team. Make sure
                                    to add a Name and a City too!
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomButtonContainer}>
                        <Button
                            title={'All'}
                            onPress={() => setFilteredData(playerData)}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{ color: 'black' }}
                        />
                        <Button
                            title={'Forwards'}
                            onPress={() => filterPlayers('F')}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{ color: 'black' }}
                        />
                        <Button
                            title={'Centers'}
                            onPress={() => filterPlayers('C')}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{ color: 'black' }}
                        />
                        <Button
                            title={'Guards'}
                            onPress={() => filterPlayers('G')}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{ color: 'black' }}
                        />
                    </View>

                    <FlatList
                        horizontal={true}
                        data={
                            filteredData?.length > 0
                                ? filteredData.filter(
                                      (player) => !newTeam.includes(player)
                                  )
                                : []
                        }
                        renderItem={({ item, index }) => (
                            <PlayerCard
                                player={item}
                                index={index}
                                onTeam={false}
                            />
                        )}
                        keyExtractor={(item, index) => `x${index}`}
                    />
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputRow: {
        flex: 10,
        height: '30%',
        flexDirection: 'row',
    },
    playerCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'column',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boldText: { fontSize: 20, fontWeight: '500' },
    teamInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListStyle: { width: '100%', height: '70%' },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: 'orange',
        backgroundColor: 'transparent',
    },
    secondaryButtonStyle: {
        width: 200,
        borderWidth: 2,
        borderColor: 'orange',
        backgroundColor: 'transparent',
    },
})
