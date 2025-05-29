import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { backButtonStyle } from './BackButton.style'

interface BackButtonProps {
    onClicked: () => void
}

export const BackButton = ({ onClicked }: BackButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClicked}
            style={backButtonStyle.buttonSquare}>
            <Icon name='arrow-back-outline' size={28} color={'white'} />
        </TouchableOpacity>
    )
}
