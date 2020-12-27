/**
 * @version 0.30
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

import { strings } from '../../../../services/i18n'

import { setLoaderStatus, setSelectedAccount } from '../../../../appstores/Stores/Main/MainStoreActions'
import Log from '../../../../services/Log/Log'
import settingsActions from '../../../../appstores/Stores/Settings/SettingsActions'
import UIDict from '../../../../services/UIDict/UIDict'

import { ThemeContext } from '../../../theme/ThemeProvider'

import ListItem from '../../../../components/elements/new/list/ListItem/Setting'


class SettingsETH extends Component {

    handleAllow = async (title) => {
        try {
            setLoaderStatus(true)
            const val = await settingsActions.getSetting(title)
            if (!val || val === '0') {
                await settingsActions.setSettings(title, '1')
            } else {
                await settingsActions.setSettings(title, '0')
            }
            setLoaderStatus(false)
        } catch (e) {
            Log.log('Settings.ETH.handleAllow' + e.message)
        }
        setLoaderStatus(false)
    }

    render() {

        const { colors, GRID_SIZE } = this.context

        const { containerStyle, settingsStore, mainStore } = this.props

        const { ethAllowLongQuery = '0', ethAllowBlockedBalance = '0' } = settingsStore
        const dict = new UIDict(mainStore.selectedCryptoCurrency.currencyCode)
        const color = dict.settings.colors.mainColor

        return (
            <>
                <View>
                    <ListItem
                        title={strings('settings.walletList.allowLongQueryETH')}
                        iconType='unconfirmed'
                        onPress={() => this.handleAllow('ethAllowLongQuery')}
                        rightContent='switch'
                        switchParams={{ value: ethAllowLongQuery === '1', onPress: () => this.handleAllow('ethAllowLongQuery')}}
                    />
                    <ListItem
                        title={strings('settings.walletList.allowBlockedBalanceETH')}
                        iconType='unconfirmed'
                        onPress={() => this.handleAllow('ethAllowBlockedBalance')}
                        rightContent='switch'
                        switchParams={{ value: ethAllowBlockedBalance === '1', onPress: () => this.handleAllow('ethAllowBlockedBalance') }}
                    />
                </View>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        settingsStore: state.settingsStore.data,
        mainStore: state.mainStore
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

SettingsETH.contextType = ThemeContext

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SettingsETH)