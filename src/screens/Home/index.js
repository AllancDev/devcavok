import React from 'react';
import {SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {List, Checkbox} from 'react-native-paper';

class Home extends React.Component {
    state = {
        expanded: true,
    };

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded,
        });

    render() {
        return (
            <SafeAreaView>
                <List.Section title="ADMINISTRATIVO">
                    <List.Accordion
                        title="Documentos administrativos"
                        left={props => <Icon {...props} icon="folder" />}>
                        <List.Item title="Carta - carta teste" />
                        <List.Item title="ANAC - Site ANAC" />
                    </List.Accordion>
                </List.Section>

                <List.Section title="OPERACIONAL">
                    <List.Accordion
                        title="Categoria Allan"
                        left={props => <List.Icon {...props} icon="folder" />}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>
                </List.Section>
            </SafeAreaView>
        );
    }
}

export default Home;
