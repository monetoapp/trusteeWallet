/**
 * @version 0.3
 * @author yura
 */
import React, { Component } from 'react'
import { View } from 'react-native'

import Layout from '../../../components/elements/modal/Layout'
import Title from '../../../components/elements/modal/Title'
import Text from '../../../components/elements/modal/Text'
import Button from '../../../components/elements/modal/Button'
import Icon from '../../../components/elements/modal/Icon'
import AsyncStorage from '@react-native-community/async-storage'

import { hideModal } from '../../../appstores/Stores/Modal/ModalActions'

import { strings } from '../../../services/i18n'

export default class RbfModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRBF: null
        }
    }

    handleIsActive = async () => {
        const { callback } = this.props

        callback()

        hideModal()
    }

    handleCancel = () => {

        const { noCallback } = this.props.data

        hideModal()

        if (noCallback) {
            noCallback()
        }
    }

    statusRBF = async () => {
        const status = await AsyncStorage.getItem('RBF')
        if (status === null || status.toString() === '0'){
            this.setState({
                isRBF: false
            })
        } else {
            this.setState({
                isRBF: true
            })
        }
    }

    render() {

        const { title, icon, description } = this.props.data
        this.statusRBF()
        return (
            <Layout visible={this.props.show}>
                <View>
                    <Icon callback={hideModal} icon={icon.toLowerCase()} tbk={true} />
                    <Title style={styles.title}>
                        {title}
                    </Title>
                    <View style={{ marginTop: 8, marginBottom: -5 }}>
                        <Text style={styles.text}>
                            {description}
                        </Text>
                        <Text style={styles.text}>{ this.state.isRBF === true ? strings('modal.tbkModal.statusEnable').toUpperCase() : strings('modal.tbkModal.statusDisable').toUpperCase()}</Text>
                    </View>
                    <View>
                        <Button onPress={this.handleIsActive} color={'#864DD9'} shadow={true} style={{ marginTop: 17 }}>
                            {this.state.isRBF === true ? strings('modal.tbkModal.disable') : strings('modal.tbkModal.enable')}
                        </Button>
                        <Button onPress={this.handleCancel} style={{ backgroundColor: 'none', color: '#864DD9' }}>
                            {strings('modal.tbkModal.cancel')}
                        </Button>
                    </View>
                </View>
            </Layout>
        )
    }
}

const styles = {
    title: {
        fontFamily: 'Montserrat-Bold',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        color: '#404040',
    },
    text: {
        color: '#5C5C5C',
        fontFamily: 'SFUIDisplay-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: 0.5,
    }
}