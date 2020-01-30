import React from 'react';
import { Tabs, Button } from 'antd';
import { GEOLOCATION_OPTIONS, POSITION_KEY } from '../constants';
import '../styles/Home.css';

const { TabPane } = Tabs;

export class Home extends React.Component {
    state = {
        loadingGeolocation: false,
        loadingPosts: false, //state is reading post
        errorMessage: null,
        post:[], //store posts
    }

    getGeolocation() {
        this.setState({
            loadingGeolocation: true,
            errorMessage: null,
        });
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onGeolocationSuccess,
                this.onGeolocationFailure,
                GEOLOCATION_OPTIONS,
            );
        } else {
            this.setState({
                loadingGeolocation: false,
                errorMessage: 'Your browser does not support geolocation.',
            });
        }
    }
    //browser will call this lamuda function
    onGeolocationSuccess = (position) => { //onGeolocationSuccess is variable which should bind this context-lamuda
        this.setState({
            loadingGeolocation: false,
            errorMessage: null,
        });
        console.log(position);
        const { latitude, longitude } = position.coords; //get position in object and map to coords
        localStorage.setItem(POSITION_KEY, JSON.stringify({ latitude, longitude })); //convert JSON obj to string
        this.loadNearByPost(); //call loading post function
    }
    onGeolocationFailure = () => {
        this.setState({
            loadingGeolocation: false,
            errorMessage: 'Failed to load geolocation',
        });
    }

    loadNearByPost() {

    }

    componentDidMount() { //call geolocation()
        this.getGeolocation();
    }

    render() {
        const operations = <Button>Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    content of tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        );
    }
};
