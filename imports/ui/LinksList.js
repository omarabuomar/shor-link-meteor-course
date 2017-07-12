import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {Links} from './../api/links';
import LinksListItem from './LinksListItem';

import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      links:[]
    };
  }
  componentDidMount(){
    this.linksTracker=Tracker.autorun(()=>{
      Meteor.subscribe('links');
      const links=Links.find({
        visible : Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }
  ComponentWillUnmount(){
    this.linksTracker.stop();
  }
  renderLinksListItems(){
    if(this.state.links.length===0){
      return (
        <div className="item">
          <p className="item__status_message">No links found</p>
        </div>
      );
    }
    return this.state.links.map((link)=>{
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      // return <p key={link._id}>{link.url}</p>
    });
  }
  render(){
    return(
      <div>
        <FlipMove duration={750} easing="ease-out" maintainContainerHeight={true}>
            {this.renderLinksListItems()}
        </FlipMove>
      </div>

    );
  }
}
