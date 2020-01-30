import React from 'react';
import { Tabs, Button } from 'antd';
import { GEOLOCATION_OPTIONS, POSITION_KEY, TOKEN_KEY, API_ROOT, AUTH_HEADER } from '../constants';
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
        this.setState({
            loadingPosts: true,
            errorMessage: null,
        });
        const position = JSON.parse(localStorage.getItem(POSITION_KEY)); //convert string to JSON object
        const range = 20000;
        const token = localStorage.getItem(TOKEN_KEY); //get token from browser

        fetch(`${API_ROOT}/search?lat=${position.latitude}&lon=${position.longitude}&range=${range}`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Fail to load posts');
        }).then((data) => {
            console.log(data);
            this.setState({
                loadingPosts: false,
                posts: data ? data : [],
            })
        }).catch((error) => {
            this.setState({
                loadingPosts: false,
                errorMessage: error.message,
            })
        })
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
