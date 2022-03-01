import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, Card, Button } from 'react-native-elements'
import { useRecoilState } from 'recoil'
import { NewTeam } from '../../recoil/atoms'
import { findPlayerTeam, addPlayer, removePlayer } from '../../util'

export const PlayerCard = ({ player, index, onTeam = false }) => {
    const [newTeam, setNewTeam] = useRecoilState(NewTeam)
    const team = findPlayerTeam(player)

    return (
        <TouchableOpacity
            onPress={() =>
                onTeam
                    ? removePlayer(player, newTeam, setNewTeam)
                    : addPlayer(player, newTeam, setNewTeam)
            }
        >
            <Card key={index} containerStyle={styles.cardContainer}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={styles.infoContainer}>
                        <Text>
                            {player.firstName} {player.lastName}
                        </Text>
                        <Text>{team}</Text>
                        <Text>{player.pos.substring(0, 1)}</Text>
                    </View>
                    <View style={styles.photoContainer}>
                        <Image
                            containerStyle={{
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            source={{
                                uri: `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`,
                            }}
                        />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth: 2,
        width: '100%',
        height: '100%',
        borderColor: 'orange',
        backgroundColor: 'transparent',
    },
    cardContainer: {
        width: 200,
        height: '80%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
    },
    photoContainer: {
        flex: 5,
        width: '90%',
    },
    infoContainer: {
        flex: 3,
        marginBottom: '6%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
