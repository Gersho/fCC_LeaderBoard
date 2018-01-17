var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.addEventListener("DOMContentLoaded", function (event) {
  //react starts on line 40, ReactDOM.render is on line 14
  //first call
  var allTimeCall = new XMLHttpRequest();
  allTimeCall.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var allTimeData = JSON.parse(this.response); //first part of the data secured
      //second call
      var recentCall = new XMLHttpRequest();
      recentCall.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var recentData = JSON.parse(this.response); //second part of data secured
          //available variables are allTimeData and recentData
          ReactDOM.render(React.createElement(Main, { allTime: allTimeData, recent: recentData }), document.getElementById("react-anchor"));
        } //end sub if
      };
      //second call data
      recentCall.open("GET", "https://fcctop100.herokuapp.com/api/fccusers/top/recent", true);
      recentCall.timeout = 2000;
      recentCall.ontimeout = function (e) {
        document.getElementById("react-anchor").innerHTML = "Something went wrong, sorry !";
      };
      recentCall.onerror = function () {
        document.getElementById("react-anchor").innerHTML = "Something went wrong, sorry !";
      };
      recentCall.send();
    } //end main if
  }; // end allTimeCall.onreadystatechange
  //this is the first call data
  allTimeCall.open("GET", "https://fcctop100.herokuapp.com/api/fccusers/top/alltime", true);
  allTimeCall.timeout = 2000;
  allTimeCall.ontimeout = function (e) {
    document.getElementById("react-anchor").innerHTML = "Something went wrong, sorry !";
  };
  allTimeCall.onerror = function () {
    document.getElementById("react-anchor").innerHTML = "Something went wrong, sorry !";
  };
  allTimeCall.send();

  var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    //available props
    //  allTime
    //  recent
    function Main(props) {
      _classCallCheck(this, Main);

      var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

      _this.handleClick = _this.handleClick.bind(_this);
      var recentPodium = _this.props.recent.splice(0, 3);
      var allTimePodium = _this.props.allTime.splice(0, 3);

      var recentList = _this.props.recent.map(function (elem, index) {
        return React.createElement(
          "tbody",
          { key: "recent" + (index + 4) },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              index + 4
            ),
            React.createElement(
              "td",
              null,
              React.createElement("img", { className: "avatars", src: elem.img })
            ),
            React.createElement(
              "td",
              { className: "nickname" },
              elem.username
            ),
            React.createElement(
              "td",
              null,
              elem.recent
            ),
            React.createElement(
              "td",
              null,
              elem.alltime
            )
          )
        );
      });

      var allTimeList = _this.props.allTime.map(function (elem, index) {
        return React.createElement(
          "tbody",
          { key: "alltime" + (index + 4) },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              index + 4
            ),
            React.createElement(
              "td",
              null,
              React.createElement("img", { className: "avatars", src: elem.img })
            ),
            React.createElement(
              "td",
              { className: "nickname" },
              elem.username
            ),
            React.createElement(
              "td",
              null,
              elem.alltime
            ),
            React.createElement(
              "td",
              null,
              elem.recent
            )
          )
        );
      });

      _this.state = { allTimeList: allTimeList,
        recentList: recentList,
        current: allTimeList,
        podium: allTimePodium,
        allTimePodium: allTimePodium,
        recentPodium: recentPodium };
      return _this;
    } //end constructor


    _createClass(Main, [{
      key: "handleClick",
      value: function handleClick() {
        var newDisplay = this.state.current == this.state.allTimeList ? this.state.recentList : this.state.allTimeList;
        var newPodium = this.state.podium == this.state.allTimePodium ? this.state.recentPodium : this.state.allTimePodium;
        this.setState({ current: newDisplay, podium: newPodium });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "maintitle" },
            "freeCodeCamp Leaderboard !"
          ),
          React.createElement(
            "div",
            { className: "maintitle" },
            this.state.current == this.state.allTimeList ? "AllTime" : "Recent",
            " Ranking !"
          ),
          React.createElement(Podium, { podium: this.state.podium }),
          React.createElement(
            "button",
            { onClick: this.handleClick },
            "Switch to ",
            this.state.current == this.state.allTimeList ? "Recent" : "AllTime",
            " ranking"
          ),
          React.createElement(
            "table",
            null,
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  null,
                  "#"
                ),
                React.createElement("th", null),
                React.createElement(
                  "th",
                  null,
                  "Username"
                ),
                React.createElement(
                  "th",
                  null,
                  this.state.current == this.state.allTimeList ? "AllTime" : "Recent"
                ),
                React.createElement(
                  "th",
                  null,
                  this.state.current == this.state.allTimeList ? "Recent" : "AllTime"
                )
              )
            ),
            this.state.current
          )
        ); //end return render
      } //end render

    }]);

    return Main;
  }(React.Component); //end Main class


  var Podium = function (_React$Component2) {
    _inherits(Podium, _React$Component2);

    function Podium() {
      _classCallCheck(this, Podium);

      return _possibleConstructorReturn(this, (Podium.__proto__ || Object.getPrototypeOf(Podium)).apply(this, arguments));
    }

    _createClass(Podium, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "podium" },
          React.createElement(
            "div",
            { className: "cards", id: "first" },
            React.createElement("img", { className: "topavatars", src: this.props.podium[0].img }),
            React.createElement(
              "div",
              null,
              React.createElement(
                "h4",
                { className: "toptext" },
                React.createElement(
                  "b",
                  null,
                  this.props.podium[0].username,
                  " "
                )
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "AllTime: ",
                this.props.podium[0].alltime,
                " "
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "Recent: ",
                this.props.podium[0].recent
              )
            )
          ),
          React.createElement(
            "div",
            { className: "cards", id: "second" },
            React.createElement("img", { className: "topavatars", src: this.props.podium[1].img }),
            React.createElement(
              "div",
              null,
              React.createElement(
                "h4",
                { className: "toptext" },
                React.createElement(
                  "b",
                  null,
                  this.props.podium[1].username,
                  " "
                )
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "AllTime: ",
                this.props.podium[1].alltime,
                " "
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "Recent: ",
                this.props.podium[1].recent
              )
            )
          ),
          React.createElement(
            "div",
            { className: "cards", id: "third" },
            React.createElement("img", { className: "topavatars", src: this.props.podium[2].img }),
            React.createElement(
              "div",
              null,
              React.createElement(
                "h4",
                { className: "toptext" },
                React.createElement(
                  "b",
                  null,
                  this.props.podium[2].username,
                  " "
                )
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "AllTime: ",
                this.props.podium[2].alltime,
                " "
              ),
              React.createElement(
                "p",
                { className: "toptext" },
                "Recent: ",
                this.props.podium[2].recent
              )
            )
          )
        );
      }
    }]);

    return Podium;
  }(React.Component); //fin Podium class!

}); //fin DOMContentLoaded

/*
{
"username":"sjames1958gm",
"img":"https://avatars1.githubusercontent.com/u/4639625?v=4",
"alltime":8129,
"recent":143,
"lastUpdate":"2017-09-15T10:09:39.830Z"}
*/