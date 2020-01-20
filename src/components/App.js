import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import VideoList from './VideoList';
import VideoDetail from './VideDetail';

const KEY = 'AIzaSyAZnsxjIh-WahSTOioQdoXVDpfVusz6wbk';

class App extends React.Component{
    state ={
        videos:[],
        selectedVideo:null
    }

    componentDidMount(){
        this.onTermSubmit('javascript');
    }
    onTermSubmit=async term=>{
       const  response = await axios.get('/search',{
            baseURL: 'https://www.googleapis.com/youtube/v3/',
            params:{
            part: 'snippet',
            type : 'video',
            maxResults : 5,
            key : KEY,
            q: term
    }
        });
        this.setState({videos:response.data.items,
            selectedVideo:response.data.items[0]})
       
    }
    onVideoSelect=(video)=>{
        this.setState({selectedVideo:video})
    } 
        render(){
        return(
            <div className="ui container">
                <SearchBar handleSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                         </div>
                         <div className=" five wde column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                         </div>
                    </div>
                </div>
               
            </div>
        )
    }
}
export default App;