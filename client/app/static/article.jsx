import React from 'react';
import {Link} from 'react-router';
import Error from './error.jsx';

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: "", article: {}};
  }

  componentDidUpdate() {
    if(this.props.location.query.new) {
      $('#myModal').modal('show');
    }
  }

  componentDidMount(){

    console.log("Component Mounted!");
    console.log(this.props.params.articleId);
    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem('userToken')
    });
    var myInit = { method: 'GET',
               headers: myHeaders,
               };
    var that = this;
    fetch('/api/articles/'+this.props.params.articleId,myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else {
        that.setState({article: response.data})
        console.log(that.state.article);
        console.log(that.state.article.user);
        console.log(that.state.article.user.name);
      }
      console.log(response);
    });
    console.log("PUB");
    console.log(this.props.location.query.new);

  }
  render () {
    if(this.state.error) {
      return <Error error={this.state.error} />
    }
    if(this.state.article && this.state.article.topic && this.state.article.user) {
      return(<div>
        <div className="row">
          <div className="col-md-9">
            <div className="article-heading">
                <h1 className="single-article-title">{this.state.article.title}
                </h1>
                <div className="single-article-meta">
                  Last updated on {new Date(this.state.article.updated_at).toDateString()}
              </div>
            </div>
            <div className="single-article-body">
            {this.state.article.body}
            </div>
          </div>
          <div className="col-md-3 article-sidebar">
            <div className="sidebar-block">
            <div className="sidebar-title">Filed under</div>
            <h2>{this.state.article.topic.name}</h2>
            </div>
            <div className="sidebar-block">
            <div className="sidebar-title">Last Updated By</div>
            <h3>{this.state.article.user.name}</h3>
            <p>{this.state.article.user.about}</p>
            </div>
            <Link to={'/article/edit/'+this.state.article.id} className="btn btn-default btn-block btn-lg">Edit</Link>
          </div>
            </div>

              <div className="modal modal-fullscreen fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div className="modal-body">
                      <center>
                      <div className="row">

                        <div className="col-md-6 col-sd-12">
                          <h1><b>Yayyyy!</b></h1><h3>Your article has been published</h3>
                          <br/>
                          <br/>
                          <button type="button" className="btn btn-default btn-block btn-lg" data-dismiss="modal">That's great</button>
                        </div>
                      </div>
                    </center>
                    </div>

                  </div>
                </div>
              </div>
          </div>
            );
    }
    else {
      return <div>There are no articles</div>;
    }
  }
}

export default ViewArticle;