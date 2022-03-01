import { FilteredData, PlayerData } from '../recoil/atoms'
import { useRecoilState } from 'recoil'

export const removeFilters = () => {
    const [filteredData, setFilteredData] = useRecoilState(FilteredData)
    const [playerData] = useRecoilState(PlayerData)
    setFilteredData(playerData)
}
