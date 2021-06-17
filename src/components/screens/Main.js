import styled from "styled-components";
import React from "react";
import PostModal from "./PostModal";
import { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getArticlesAPI } from "../../actions/index";
import ReactPlayer from "react-player";

function Main(props) {
  const [showModal, setShowModal] = useState("close");
  // const [like, setLike] = useState("");

  useEffect(() => {
    props.getArticles();
  }, []);

  // const handleLike = (e) => {
  //   e.preventDefault();
  //   let Like = 0;
  //    Like = Like + 1;
  //   setLike(...like, Like);

  // }

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <>
      {props.articles.length === 0 ? (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="user" />
              ) : (
                <img src="/images/user.svg" alt="user" />
              )}

              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Create a post
              </button>
            </div>
            <div>
              <button>
                <img onClick={handleClick}src="https://img.icons8.com/color/48/000000/image-gallery.png" />
                <span onClick={handleClick}>Photo</span>
              </button>
              <button>
                <img onClick={handleClick}src="https://img.icons8.com/color/48/000000/video-call--v1.png" />
                <span onClick={handleClick}>Video</span>
              </button>
              <button>
                <img onClick={handleClick} src="https://img.icons8.com/color/48/000000/event-accepted-tentatively.png" />
                <span onClick={handleClick}>Event</span>
              </button>
              <button>
                <img onClick={handleClick} src="https://img.icons8.com/color/48/000000/journal.png" />
                <span onClick={handleClick}>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && (
              <img src="https://img.icons8.com/color/48/000000/iphone-spinner--v2.png" />
            )}

            <div>
              {props.articles.length > 0 &&
                props.articles.map((article, key) => (
                  <Article key={key}>
                    <ShareActor>
                      <a>
                        <img src={article.actor.image} />
                      </a>
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>

                      <button>
                        <img src="https://img.icons8.com/material/48/000000/more--v1.png" />
                      </button>
                    </ShareActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                      <a>
                        {!article.shareImg && article.video ? (
                          <ReactPlayer width={"100%"} url={article.video} />
                        ) : (
                          article.shareImg && <img src={article.shareImg} />
                        )}
                      </a>
                    </SharedImg>
                    <SocialCounts>
                   
                    </SocialCounts>
                    <SocialActions>
                      <button >
                        <img src="https://img.icons8.com/color/48/000000/facebook-like.png" />
                        <small>Like</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/topic.png" />
                        <small>Comment</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/share--v1.png" />
                        <small>Share</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/filled-sent.png" />
                        <small>Send</small>
                      </button>
                    </SocialActions>
                  </Article>
                ))}
            </div>
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
          <p>There is no article!!.Add some.</p>
        </Container>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="user" />
              ) : (
                <img src="/images/user.svg" alt="user" />
              )}

              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Create a post
              </button>
            </div>
            <div>
               
              <button  >
                <img onClick={handleClick} src="https://img.icons8.com/color/48/000000/image-gallery.png" />
                <span onClick={handleClick}>Photo</span>
              </button>
              <button>
                <img onClick={handleClick} src="https://img.icons8.com/color/48/000000/video-call--v1.png" />
                <span onClick={handleClick}>Video</span>
              </button>
              <button>
                <img onClick={handleClick}src="https://img.icons8.com/color/48/000000/event-accepted-tentatively.png" />
                <span onClick={handleClick}>Event</span>
              </button>
              <button>
                <img onClick={handleClick}src="https://img.icons8.com/color/48/000000/journal.png" />
                <span onClick={handleClick}>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && (
              <img src="https://img.icons8.com/color/48/000000/iphone-spinner--v2.png" />
            )}

            <div>
              {props.articles.length > 0 &&
                props.articles.map((article, key) => (
                  <Article key={key}>
                    <ShareActor>
                      <a>
                        <img src={article.actor.image} />
                      </a>
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>

                      <button>
                        <img src="https://img.icons8.com/material/48/000000/more--v1.png" />
                      </button>
                    </ShareActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                      <a>
                        {!article.shareImg && article.video ? (
                          <ReactPlayer width={"100%"} url={article.video} />
                        ) : (
                          article.shareImg && <img src={article.shareImg} />
                        )}
                      </a>
                    </SharedImg>
                    <SocialCounts>
           
                    </SocialCounts>
                    <SocialActions>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/facebook-like.png" />
                        <small>like</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/topic.png" />
                        <small>Comment</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/share--v1.png" />
                        <small>Share</small>
                      </button>
                      <button>
                        <img src="https://img.icons8.com/color/48/000000/filled-sent.png" />
                        <small>Send</small>
                      </button>
                    </SocialActions>
                  </Article>
                ))}
            </div>
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: #fff;

  div {
    margin-top: 10px;
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      line-height: 1.5;
      min-height: 40px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #fff;
        text-align-last: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
          width: 30px;
          height: 30px;
        }
        span {
          color: #78b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const ShareActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  & {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;

    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 1;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align-last: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 5px;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align-last: left;
`;
const SharedImg = styled.div`
  margin-top: 0px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 3.5;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 0px 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-block;
    align-items: center;
    padding: 8px;
    color: #8a66c2;
    img {
      width: 20px;
      height: 20px;
    }
    small {
      display: inline-block;
    }

    @media all and (min-width: 700px) {
      span,
      small {
        margin-left: 12px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
