import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from 'firebase'
import { postArticleAPI } from '../../actions/index'


function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImg, setShareImg] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`Not a image, the file is a ${typeof image}`);
      return;
    }

    setShareImg(image);
  };

  const switchAssetArea = (area) => {
    setShareImg("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
      e.preventDefault();
      if (e.target !== e.currentTarget) {
          return;
      }
      const payload = {
          image: shareImg,
          video: videoLink,
          user: props.user,
          description: editorText,
          timestamp: firebase.firestore.Timestamp.now(),
      };

      props.postArticle(payload);
      reset(e);
  }

  const reset = (e) => {
    setEditorText("");
    setShareImg("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="https://img.icons8.com/color/48/000000/close-window.png" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                  {props.user.photoURL ? (<img src={props.user.photoURL}/>) : (<img src="https://img.icons8.com/color/48/000000/user.png" />)}
                
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImg>
                    <input
                      type="file"
                      accept="image/gif, image/jpg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an Image</label>
                    </p>
                    {shareImg && <img src={URL.createObjectURL(shareImg)} />}
                  </UploadImg>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link "
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="https://img.icons8.com/color/48/000000/share-rounded.png" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="https://img.icons8.com/color/48/000000/video.png" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton >
                  <img src="https://img.icons8.com/color/48/000000/topic--v1.png" />
                </AssetButton>
              </ShareComment>
              <PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  color: #000;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: #fff;
  max-height: 98%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    outline: none;
    border: none;
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  max-width: auto;
  margin-right: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.2)" : "#fff")};
  &:hover {
    background: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.08)" : "#004182"};
  }
`;
const Editor = styled.div`
  padding: 16px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 28px;
  }
`;

const UploadImg = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
