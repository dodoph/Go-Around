import React from 'react';
import { Tabs, Spin, Row, Col } from 'antd';
import { CreatePostButton } from './CreatePostButton';
import { GEOLOCATION_OPTIONS, POSITION_KEY, TOKEN_KEY, API_ROOT, AUTH_HEADER,POST_TYPE_IMAGE,
    POST_TYPE_VIDEO, } from '../constants';
import { Gallery } from './Gallery';

const { TabPane } = Tabs;

export class Home extends React.Component {
    state = {
        isLoadingGeoLocation: false,
        isLoadingPosts: false, //state is reading post
        error: '',
        posts: [], //store posts
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({ isLoadingGeoLocation: true, error: '' });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEOLOCATION_OPTIONS,
            );
        } else {
            this.setState({ error: 'Geolocation is not supported.'});
        }
    }
    ////browser will call this lamuda function
    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords; ////get position in object and map to coords
        localStorage.setItem(POSITION_KEY, JSON.stringify({ lat: latitude, lon: longitude })); //convert JSON obj to string
        this.setState({ isLoadingGeoLocation: false, error: '' });
        this.loadNearbyPosts(); //call loading post function
    }

    onFailedLoadGeoLocation = () => {
        this.setState({ isLoadingGeoLocation: false, error: 'Failed to load geo location.' });
    }

    loadNearbyPosts = () => {

        this.setState({ isLoadingPosts: true, error: '' });

        const { lat, lon } = JSON.parse(localStorage.getItem(POSITION_KEY)); ////convert string to JSON object
        const token = localStorage.getItem(TOKEN_KEY); //get token from browser
        fetch(`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to load post.');
            })
            .then((data) => {
                console.log(data);
                this.setState({ posts: data ? data : [], isLoadingPosts: false });
            })
            .catch((e) => {
                console.error(e);
                this.setState({ isLoadingPosts: false, error: e.message });
            });
    }

    renderImagePosts() {
        const { error, isLoadingGeoLocation, isLoadingPosts, posts } = this.state;
        if (error) {
            return <div>{error}</div>;
        } else if (isLoadingGeoLocation) {
            return <Spin tip="Loading geo location..."/>;
        } else if (isLoadingPosts) {
            return <Spin tip="Loading posts..."/>
        } else if (posts.length > 0) { //render post
            const images = posts.map((post) => { //use map func to convert our post info to Gallery required type
                return {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    caption: post.message,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                };
            });
            return <Gallery images={images}/>
        } else {
            return 'No nearby posts';
        }
    }

    render() {
        const operations = <CreatePostButton onSuccess={this.loadNearbyPost} />;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {this.renderImagePosts()}
                </TabPane>
                <TabPane tab="Video Posts" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Map" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        );
    }
}
