import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    //----------------------------------------------------//

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',

        paddingHorizontal: 15,

        width: '100%',
    },

    //----------------------------------------------------//

    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 15,

        width: '100%',
    },
    titleText: {
        textAlign: 'center',

        fontSize: 16,
        fontWeight: 'bold',

        color: '#f62c65ff'
    },

    // //----------------------------------------------------//

    body: {
        flex: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',

        width: '100%'
    },

    // //----------------------------------------------------//

    inputField: {
        flexDirection: 'collumn',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        marginBottom: 5,
        paddingBottom: 20,
        padding: 10,

        borderRadius: 4,

        width: '100%',

        backgroundColor: '#ffffff'
    },
    inputFieldTitle: {
        marginBottom: 10,

        fontSize: 16,
        fontWeight: 'bold'
    },
    inputFieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 6,

        //backgroundColor: '#ff0000ff'
    },
    inputFieldInput: {
        flex: 1,

        paddingHorizontal: 10,
        marginLeft: 6,

        borderRadius: 4,

        height: 40,

        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6ff',
        backgroundColor: '#f0f0f0ff'
    },
    inputFieldInputLabel: {
        flex: 1,

        textAlign: 'left',

        //backgroundColor: '#ccff00ff'
    },
    inputFieldTableLabel: {
        paddingHorizontal: 10,
        marginLeft: 6,

        textAlign:'center',

        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6ff',
    },
    inputFieldPickerText: {
        paddingVertical: 10,

        color: '#969696ff'
    },
    radioButton: {
        padding: 8,
        marginLeft: 2,
        marginRight: 8,

        borderRadius: 8,

        backgroundColor: '#f0f0f0ff',
    },
    radioText: {
        color: '#969696ff'
    },
    staticField: {
        paddingVertical: 13,

        borderRadius: 4,

        width: '100%',

        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6ff',
    },
    staticFieldText: {
        color: '#969696ff'
    },
    radioButtonSelected: {
        padding: 8,

        borderRadius: 8,

        backgroundColor: '#1488DB',
    },
    radioTextSelected: {
        color: '#000000ff'
    },

    //----------------------------------------------------//

    

    //----------------------------------------------------//

    button: {
        backgroundColor: '#6200EE',
        padding: 15,
        borderRadius: 5,
        minWidth: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 300,
    },
    choiceButton: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    choiceText: {
        fontSize: 16,
        textAlign: 'center',
    },

    // //----------------------------------------------------//
});