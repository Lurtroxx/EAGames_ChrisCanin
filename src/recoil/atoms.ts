import { atom } from 'recoil'

export const TeamData = atom({
    key: 'TeamData',
    default: [],
})

export const PlayerData = atom({
    key: 'PlayerData',
    default: null,
})

export const FilteredData = atom({
    key: 'FilteredData',
    default: null,
})

export const NewTeam = atom({
    key: 'NewTeam',
    default: [],
})
