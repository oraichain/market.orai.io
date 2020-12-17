import React from 'react';
import { Upload, Button, Spin } from 'antd';
import Icon from '@ant-design/icons';
import Layout from '../../layouts';
import uploadSVG from '../../assets/upload.svg';
import addImageSVG from '../../assets/add_image.svg';
import takePhotoSVG from '../../assets/take_photo.svg';
import exampleSVG from '../../assets/example.svg';
import cat from '../../assets/cat.jpeg';
import cat1 from '../../assets/cat1.jpeg';
import cat2 from '../../assets/cat2.jpeg';
import cat3 from '../../assets/cat3.jpeg';
import cat4 from '../../assets/cat4.jpeg';
import cat5 from '../../assets/cat5.jpeg';
import cat6 from '../../assets/cat6.jpeg';
import rightArrowSVG from '../../assets/right_arrow.svg';
import styles from './index.less';

const Loading = (props) => (
  <svg
    {...props}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50.0001 18.5484C47.2582 18.5484 45.1614 16.4516 45.1614 13.7097V4.83871C45.1614 2.09677 47.2582 0 50.0001 0C52.742 0 54.8388 2.09677 54.8388 4.83871V13.7097C54.8388 16.2903 52.742 18.5484 50.0001 18.5484Z"
      fill="#76FFE5"
    />
    <path
      d="M50.0001 100C47.2582 100 45.1614 97.9033 45.1614 95.1613V86.2904C45.1614 83.5484 47.2582 81.4517 50.0001 81.4517C52.742 81.4517 54.8388 83.5484 54.8388 86.2904V95.1613C54.8388 97.9033 52.742 100 50.0001 100Z"
      fill="#0DBFBA"
    />
    <path
      d="M31.7743 23.387C30.1614 23.387 28.5485 22.5806 27.5808 20.9677L23.2259 13.387C21.9356 11.129 22.742 8.06445 25.0001 6.77413C27.2582 5.48381 30.3227 6.29026 31.613 8.54832L35.9678 16.129C37.2582 18.387 36.4517 21.4515 34.1937 22.7419C33.5485 23.0645 32.5808 23.387 31.7743 23.387Z"
      fill="#BBFFF2"
    />
    <path
      d="M72.5807 93.871C70.9678 93.871 69.3549 93.0646 68.3871 91.4517L64.0323 83.871C62.742 81.613 63.5484 78.5485 65.8065 77.2581C68.0646 75.9678 71.1291 76.7743 72.4194 79.0323L76.7742 86.613C78.0645 88.871 77.2581 91.9356 75 93.2259C74.1936 93.7097 73.3871 93.871 72.5807 93.871Z"
      fill="#1BCEB8"
    />
    <path
      d="M18.5484 36.613C17.742 36.613 16.9355 36.4517 16.1291 35.9679L8.54845 31.613C6.29038 30.3227 5.48393 27.2582 6.77425 25.0001C8.06457 22.742 11.1291 21.9356 13.3872 23.2259L20.9678 27.5808C23.2259 28.8711 24.0323 31.9356 22.742 34.1937C21.7743 35.8066 20.1613 36.613 18.5484 36.613Z"
      fill="#E1FFF9"
    />
    <path
      d="M89.1936 77.4193C88.3872 77.4193 87.5807 77.258 86.7743 76.7741L79.0323 72.4193C76.7743 71.129 75.9678 68.0644 77.2581 65.8064C78.5485 63.5483 81.613 62.7419 83.871 64.0322L91.4517 68.387C93.7097 69.6773 94.5162 72.7418 93.2259 74.9999C92.4194 76.6128 90.8065 77.4193 89.1936 77.4193Z"
      fill="#26DBC0"
    />
    <path
      d="M13.7097 54.8387H4.83871C2.09677 54.8387 0 52.7419 0 50C0 47.258 2.09677 45.1613 4.83871 45.1613H13.7097C16.4516 45.1613 18.5484 47.258 18.5484 50C18.5484 52.7419 16.2903 54.8387 13.7097 54.8387Z"
      fill="#F3FFFD"
    />
    <path
      d="M95.1613 54.8387H86.2904C83.5484 54.8387 81.4517 52.7419 81.4517 50C81.4517 47.258 83.5484 45.1613 86.2904 45.1613H95.1613C97.9033 45.1613 100 47.258 100 50C100 52.7419 97.9033 54.8387 95.1613 54.8387Z"
      fill="#2EE5C6"
    />
    <path
      d="M10.8064 77.4193C9.19352 77.4193 7.58062 76.6128 6.61287 74.9999C5.32255 72.7418 6.129 69.6773 8.38707 68.387L15.9677 64.0322C18.2258 62.7419 21.2903 63.5483 22.5806 65.8064C23.8709 68.0644 23.0645 71.129 20.8064 72.4193L13.2258 76.7741C12.5806 77.258 11.7742 77.4193 10.8064 77.4193Z"
      fill="#11AEBA"
    />
    <path
      d="M81.4517 36.613C79.8388 36.613 78.2259 35.8066 77.2581 34.1937C75.9678 31.9356 76.7743 28.8711 79.0323 27.5808L86.613 23.2259C88.871 21.9356 91.9355 22.742 93.2259 25.0001C94.5162 27.2582 93.7097 30.3227 91.4517 31.613L83.871 35.9679C83.0646 36.4517 82.2581 36.613 81.4517 36.613Z"
      fill="#3BEDCB"
    />
    <path
      d="M27.4195 93.871C26.613 93.871 25.8066 93.7097 25.0001 93.2259C22.742 91.9356 21.9356 88.871 23.2259 86.613L27.5808 79.0323C28.8711 76.7743 31.9356 75.9678 34.1937 77.2581C36.4517 78.5485 37.2582 81.613 35.9678 83.871L31.613 91.4517C30.6453 93.0646 29.0324 93.871 27.4195 93.871Z"
      fill="#0FB8BC"
    />
    <path
      d="M68.2258 23.387C67.4194 23.387 66.6129 23.2257 65.8065 22.7419C63.5484 21.4515 62.742 18.387 64.0323 16.129L68.3871 8.54832C69.6775 6.29026 72.742 5.48381 75 6.77413C77.2581 8.06445 78.0645 11.129 76.7742 13.387L72.4194 20.9677C71.4517 22.4193 69.8387 23.387 68.2258 23.387Z"
      fill="#57F7D8"
    />
  </svg>
);

export default class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  render() {
    const { loading } = this.state;
    const children = (
      <div className={styles.Photo}>
        <div className={styles.container}>
          <div className={styles.title}>
            Photo To Painting
            <div className={styles.subTitle}>(oracle_photo2painting_v3.02)</div>
          </div>
          {/* <div className={styles.upload}>
            {!loading ? (
              <>
                <div className={styles.title}>Upload your picture to see what happen</div>
                <Upload openFileDialogOnClick={false} showUploadList={false}>
                  <div className={styles.uploadArea}>
                    <img src={uploadSVG} className={styles.uploadImage} />
                    <div className={styles.drag}>Drag & Drop an Image</div>
                    <div className={styles.or}>or</div>
                    <div className={styles.buttonGroup}>
                      <Button className={styles.button}>
                        <img src={addImageSVG} />
                        <div className={styles.content}>Add image</div>
                      </Button>
                      <Button className={styles.button}>
                        <img src={takePhotoSVG} />
                        <div className={styles.content}>Take photo</div>
                      </Button>
                    </div>
                  </div>
                </Upload>
              </>
            ) : (
              <>
                <Icon spin component={Loading} />
                <div className={styles.waiting}>Just only a moment ...</div>
                <div className={styles.preparing}>Image are preparing</div>
              </>
            )}
          </div> */}
          {/* <div className={styles.example}>
            <div className={styles.header}>
              Here is an example of this magic app
              <img src={exampleSVG} style={{ marginLeft: 13 }} />
            </div>
            <div className={styles.result}>
              <div className={styles.block}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.description}>Original Picture</div>
              </div>
              <img src={rightArrowSVG} />
              <div className={styles.block}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat1})`,
                  }}
                ></div>
                <div className={styles.description}>The best was picked</div>
              </div>
            </div>
            <div className={styles.suggestion}>
              It was just picked from many different modal <br />
              Here are some another results
            </div>
            <div className={styles.imageGroup}>
              <div>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat2})`,
                  }}
                ></div>
                <div className={styles.name}>Modal 0124</div>
              </div>
              <div>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat3})`,
                  }}
                ></div>
                <div className={styles.name}>Modal 0124</div>
              </div>
              <div>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat4})`,
                  }}
                ></div>
                <div className={styles.name}>Modal 0124</div>
              </div>
              <div>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat5})`,
                  }}
                ></div>
                <div className={styles.name}>Modal 0124</div>
              </div>
              <div>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat6})`,
                  }}
                ></div>
                <div className={styles.name}>Modal 0124</div>
              </div>
            </div>
          </div> */}
          <div className={styles.success}>
            <div className={styles.header}>
              <div className={styles.title}>
                We just picked the best result for you, so enjoy it!
              </div>
              <div className={styles.buttonGroup}>
                <Button className={styles.button1}>Go Back</Button>
                <Button className={styles.button2}>Download</Button>
              </div>
            </div>
            <div className={styles.result}>
              <div className={styles.left}>
                <div className={styles.rate}>Selection rate: 89%</div>
                <div className={styles.result}>
                  <div className={styles.block}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${cat})`,
                      }}
                    ></div>
                    <div className={styles.description}>Original Picture</div>
                  </div>
                  <img src={rightArrowSVG} />
                  <div className={styles.block}>
                    <div
                      className={styles.image}
                      style={{
                        backgroundImage: `url(${cat1})`,
                      }}
                    ></div>
                    <div className={styles.description}>The best was picked</div>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.content}>
                  <span style={{ fontWeight: 600 }}>Model:&nbsp;</span>
                  <span>93848aac7d8sffdccsss</span>
                </div>
                <div className={styles.content}>
                  <span style={{ fontWeight: 600 }}>Kind:&nbsp;</span>
                  <span>Abstract Art</span>
                </div>
                <div className={styles.content}>
                  <span style={{ fontWeight: 600 }}>Time executed:&nbsp;</span>
                  <span>00:00:89</span>
                </div>
                <div className={styles.content}>
                  <span style={{ fontWeight: 600 }}>Additional Info:&nbsp;</span>
                  <span>Legit content here type of cat or something</span>
                </div>
                <div className={styles.content}>
                  <span style={{ fontWeight: 600 }}>Additional Info:&nbsp;</span>
                  <span>Some legit content here</span>
                </div>
              </div>
            </div>
            <div className={styles.another}>
              <div className={styles.title}>Another modal rate</div>
              <Button className={styles.button}>All modal</Button>
            </div>
            <div className={styles.modal}>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
              <div className={styles.card}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${cat})`,
                  }}
                ></div>
                <div className={styles.name}>Modal: 05bg7844ssfe</div>
                <div className={styles.rate}>Rate: 67%</div>
                <Button className={styles.button}>Detail</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return <Layout children={children}></Layout>;
  }
}
