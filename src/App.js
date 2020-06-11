import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Input from './Input';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    globalsearch: state.search,
    globalmovieinfo: state.movieinfo,
    globalloading: state.loading,
    globalerrormessage: state.errormessage
  }
}
const mapDispachToProps = (dispach) => {
  return {
    searchmovies: (api) => dispach((dispach) => {

      dispach({ type: "loading" });
      let getfile = async () => {
        //axios.get(api).then(() => {}).catch()
        let response = await fetch(api);

        if (response.ok) {
          let userData = await response.json();
          return Promise.resolve(userData);
        }
        else
          return Promise.reject("Failed to load Table");
      }
      getfile().then((resp) => {
        let data = resp.Search;
        if(!Array.isArray(data))
        {
          dispach({ type: "error" })
        }
        else
        {
          dispach({ type: "searchmovies", value: data })
        }
        
      })
        .catch(_ => {

          dispach({ type: "error" })

        })

    }),
    movieinfo: (api) => dispach((dispach) => {
      dispach({ type: "loading" });
      let getfile = async () => {
        let response = await fetch(api);

        if (response.ok) {
          let userData = await response.json();

          return Promise.resolve(userData);
        }
        else
          return Promise.reject("Failed to load Table");
      }
      getfile().then((resp) => {
        let data = resp;
        dispach({ type: "moreinfo", value: data })
      })
        .catch(_ => {

          dispach({ type: "error" })

        })

    }),
    tabchange: () => dispach({ type: "tabchange" })

  }
}

class App extends Component {
  state = {
    tab: "tab-1",
    moreinfo: false,
    search: false
  }

  search = () => {
    this.setState({ search: true })
    if (this.moviename.value != "" && this.movieyear.value != "") {

      let api = "http://www.omdbapi.com/?s=" + this.moviename.value + "&y=" + this.movieyear.value + "&apikey=9c495c1b";
      this.moviename.value = "";
      this.movieyear.value = "";
      this.props.searchmovies(api);
    }


  }
  movieinfo = (index) => {
    let imdbid = this.props.globalsearch[index].imdbID
    let api = "http://www.omdbapi.com/?i=" + imdbid + "&apikey=9c495c1b";
    this.props.movieinfo(api);
    this.setState({ moreinfo: true });
  }
  tabchange = (choosentab) => {
    this.setState({
      tab: choosentab,
      search: false
    })
    this.props.tabchange();
  }
  stopinfo = () => {
    this.setState({ moreinfo: false });
  }

  render() {
    let tabBackground = {backgroundColor : "red"}
   
      
      return (
        <div className="App">
          <div id="menu">
            <input className="menu_button" style={this.state.tab === "tab-1" ? tabBackground : {}} onClick={() => { this.tabchange("tab-1") }} value="TAB 1" type="submit" />
            <input className="menu_button" style={this.state.tab === "tab-2" ? tabBackground : {}}onClick={() => { this.tabchange("tab-2") }} value="TAB 2" type="submit" />
          </div>
          {this.state.moreinfo ?
            <div className="moreinfo-wrapper">
              <div className="moreinfo-content">
                <center><h2>{this.props.globalmovieinfo.Title}</h2></center>
                <div className="moviedetails">
                  <div className="allinfo">
                    <div className="writencontent"><b>Released:</b> {this.props.globalmovieinfo.Released} </div>
                    <div className="writencontent"><b>boxoffice:</b> {Number(this.props.globalmovieinfo.imdbRating) > 7 ? "HIT" : "FLOP"} </div>
                    <div className="writencontent"><b>Rated:</b> {this.props.globalmovieinfo.Rated} </div>
                    <div className="writencontent"><b>Genre:</b> {this.props.globalmovieinfo.Genre} </div>
                    <div className="writencontent"><b>Director:</b> {this.props.globalmovieinfo.Director} </div>
                    <div className="writencontent"><b>Writer:</b> {this.props.globalmovieinfo.Writer} </div>
                    <div className="writencontent"><b>Actors:</b> {this.props.globalmovieinfo.Actors} </div>
                    <div className="writencontent"><b>Plot:</b> <p>{this.props.globalmovieinfo.Plot}</p> </div>
                    <div className="writencontent"><b>Language:</b> {this.props.globalmovieinfo.Language} </div>
                    <div className="writencontent"><b>Country:</b> {this.props.globalmovieinfo.Country} </div>
                    <div className="writencontent"><b>Awards:</b> {this.props.globalmovieinfo.Awards} </div>
                    <div className="writencontent"><b>imdbRating:</b> {this.props.globalmovieinfo.imdbRating} </div>
                  </div>
                  <div className="image-wrapper">
                  {this.props.globalmovieinfo.Poster==="N/A"?"N/A":
                    <img className="image" src={this.props.globalmovieinfo.Poster}></img>}
                  </div>
                </div>

                <center><button className="moreinfo-close" onClick={this.stopinfo}>CLOSE</button></center>
              </div>
            </div>
            : null
          }
          <div className="inputtag">
            <div className="inputtaginside">MOVIE NAME</div>
            <input className="inputtaginside" ref={(input) => this.moviename = input} placeholder="Enter movie name" type="text"></input>
            <div className="inputtaginside">MOVIE YEAR</div>
            <input className="inputtaginside" ref={(input) => this.movieyear = input} placeholder="Ex-2020" type="number" max="4"></input>
            <Input onclickfunction={this.search} value="SUBMIT"></Input>
          </div>
          { this.state.search ?
            !this.props.globalloading ?
            this.props.globalsearch.length ?
            this.state.tab === "tab-1"?
            (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>YEAR OF RELEASE</th>
                      <th>TYPE</th>
                      <th>MORE INFO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.globalsearch.map((items, index) => {
                      return (
                        <>
                          <tr>
                            <td>{items["Title"]}</td>
                            <td>{items["Year"]}</td>
                            <td>{items["Type"]}</td>
                          
                          <td >

                              <Input onclickfunction={() => this.movieinfo(index)} value="MORE INFO">
                              </Input>

                            </td>
                            </tr>
                         
                        </>
                      )

                    })}
                  </tbody>
                </table>
                  </div>):
                  (
                  <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>TITLE</th>
                        <th>YEAR OF RELEASE</th>
                        <th>TYPE</th>
                        <th>IMAGE</th>
                        <th>MORE INFO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.globalsearch.map((items, index) => {
                        return (
                          <>
                            <tr>
                              <td>{items["Title"]}</td>
                              <td>{items["Year"]}</td>
                              <td>{items["Type"]}</td>
                              <td>
                              {items["Poster"]==="N/A"?"N/A":
                     <img className="tableimg" src={items["Poster"]}></img>}
                                </td>
                              <td >
                                <Input onclickfunction={() => this.movieinfo(index)} value="MORE INFO">
                                </Input>
                              </td>
                            </tr>
                          </>
                        )
  
                      })}
                    </tbody>
                  </table>
                  </div>
                  )
                  :<div className="data-container">{this.props.globalerrormessage}</div> : <div>Data is loading ...</div> :null
          }
  </div>
      );
    }
  }


export default connect(mapStateToProps, mapDispachToProps)(App);
