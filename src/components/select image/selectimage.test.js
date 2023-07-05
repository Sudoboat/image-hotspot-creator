/* eslint-disable react/no-unknown-property */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SelectImage from './selectImage'
import React from 'react'

describe('Select Page', () => {
  test('ProceedButton', async () => {
    const imageAssets = [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: 'F52T0mHLmmSTFBhhBDw6O',
          type: 'Asset',
          createdAt: '2023-07-05T08:23:07.562Z',
          updatedAt: '2023-07-05T08:23:09.150Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T08:23:09.150Z',
          firstPublishedAt: '2023-07-05T08:23:09.150Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Auditbook Lambda Architecture.jpg',
          },
          description: {
            'en-US': 'image/jpeg',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/F52T0mHLmmSTFBhhBDw6O/6eb79956387c61e3c7d4e46fbbd28531/Auditbook_Lambda_Architecture.jpg',
              details: {
                size: 13461,
                image: {
                  width: 300,
                  height: 150,
                },
              },
              fileName: 'Auditbook Lambda Architecture.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '4YzsKzjPI8ZfnKZsRpPDYO',
          type: 'Asset',
          createdAt: '2023-07-05T08:22:29.773Z',
          updatedAt: '2023-07-05T08:22:31.193Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T08:22:31.193Z',
          firstPublishedAt: '2023-07-05T08:22:31.193Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'lambda function.png',
          },
          description: {
            'en-US': 'image/png',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/4YzsKzjPI8ZfnKZsRpPDYO/b9835a0c6fca6235e357c22dd650ce5b/lambda_function.png',
              details: {
                size: 18518,
                image: {
                  width: 1200,
                  height: 1200,
                },
              },
              fileName: 'lambda function.png',
              contentType: 'image/png',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '1XpXP7PuFGpDEEkIU38J8W',
          type: 'Asset',
          createdAt: '2023-07-05T08:15:14.855Z',
          updatedAt: '2023-07-05T08:15:15.703Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 0,
          version: 2,
        },
        fields: {
          title: {
            'en-US': 'croppedWall.JPG',
          },
          description: {
            'en-US': 'image/jpeg',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/1XpXP7PuFGpDEEkIU38J8W/18fe481eebb6de05b3086537369260be/croppedWall.JPG',
              details: {
                size: 2084782,
                image: {
                  width: 3991,
                  height: 2243,
                },
              },
              fileName: 'croppedWall.JPG',
              contentType: 'image/jpeg',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '63GR6njfCn5psLzka6sc81',
          type: 'Asset',
          createdAt: '2023-07-05T07:51:45.274Z',
          updatedAt: '2023-07-05T07:51:46.551Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T07:51:46.551Z',
          firstPublishedAt: '2023-07-05T07:51:46.551Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Vijayaragavan.png',
          },
          description: {
            'en-US': 'image/png',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/63GR6njfCn5psLzka6sc81/dc5d81ede2b1ef054ed953c96248d8e9/Vijayaragavan.png',
              details: {
                size: 110679,
                image: {
                  width: 355,
                  height: 355,
                },
              },
              fileName: 'Vijayaragavan.png',
              contentType: 'image/png',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '5VmbM2nx5mIu0mGGSdKptu',
          type: 'Asset',
          createdAt: '2023-07-05T07:47:08.747Z',
          updatedAt: '2023-07-05T07:47:10.047Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T07:47:10.047Z',
          firstPublishedAt: '2023-07-05T07:47:10.047Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Vijayaragavan.png',
          },
          description: {
            'en-US': 'image/png',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/5VmbM2nx5mIu0mGGSdKptu/dfe01e4475b001ac030ee083fd02262c/Vijayaragavan.png',
              details: {
                size: 110679,
                image: {
                  width: 355,
                  height: 355,
                },
              },
              fileName: 'Vijayaragavan.png',
              contentType: 'image/png',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '3DTqIbCXIKDqr1zSFsKQZv',
          type: 'Asset',
          createdAt: '2023-07-05T07:32:41.286Z',
          updatedAt: '2023-07-05T07:32:42.435Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T07:32:42.435Z',
          firstPublishedAt: '2023-07-05T07:32:42.435Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Vijayaragavan.png',
          },
          description: {
            'en-US': 'image/png',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/3DTqIbCXIKDqr1zSFsKQZv/6abe5875e96e1b9f638a8c68e724c7a3/Vijayaragavan.png',
              details: {
                size: 110679,
                image: {
                  width: 355,
                  height: 355,
                },
              },
              fileName: 'Vijayaragavan.png',
              contentType: 'image/png',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '7EuqLuhx9F7Y0Mcof8odZa',
          type: 'Asset',
          createdAt: '2023-07-05T07:31:52.094Z',
          updatedAt: '2023-07-05T07:31:53.725Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T07:31:53.725Z',
          firstPublishedAt: '2023-07-05T07:31:53.725Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Vijayaragavan.png',
          },
          description: {
            'en-US': 'image/png',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/7EuqLuhx9F7Y0Mcof8odZa/3570dca6f14c0e532aee884bae288500/Vijayaragavan.png',
              details: {
                size: 110679,
                image: {
                  width: 355,
                  height: 355,
                },
              },
              fileName: 'Vijayaragavan.png',
              contentType: 'image/png',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '1sq9srNR3aWSwFlqysxjPO',
          type: 'Asset',
          createdAt: '2023-07-05T04:13:07.666Z',
          updatedAt: '2023-07-05T04:13:09.083Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T04:13:09.083Z',
          firstPublishedAt: '2023-07-05T04:13:09.083Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'Interior.jpg',
          },
          description: {
            'en-US': 'image/jpeg',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/1sq9srNR3aWSwFlqysxjPO/f08bf4e9ed8ba3ed88c83079f73fe571/Interior.jpg',
              details: {
                size: 119022,
              },
              fileName: 'Interior.jpg',
              contentType: 'image/jpeg',
            },
          },
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'ov64r3ga08sj',
            },
          },
          id: '7wDhngi3tkOkkuAy8mDQO8',
          type: 'Asset',
          createdAt: '2023-07-05T04:09:48.024Z',
          updatedAt: '2023-07-05T04:09:49.750Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          publishedVersion: 2,
          publishedAt: '2023-07-05T04:09:49.750Z',
          firstPublishedAt: '2023-07-05T04:09:49.750Z',
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
          publishedCounter: 1,
          version: 3,
          publishedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '29VttDupvkToaOb1lER1e4',
            },
          },
        },
        fields: {
          title: {
            'en-US': 'croppedWall.JPG',
          },
          description: {
            'en-US': 'image/jpeg',
          },
          file: {
            'en-US': {
              url: '//images.ctfassets.net/ov64r3ga08sj/7wDhngi3tkOkkuAy8mDQO8/8180f26d9fdfbaa3586b7a4e7497e1a9/croppedWall.JPG',
              details: {
                size: 2084782,
                image: {
                  width: 3991,
                  height: 2243,
                },
              },
              fileName: 'croppedWall.JPG',
              contentType: 'image/jpeg',
            },
          },
        },
      },
    ]
    let url = { url: '', contentful: '' }
    render(
      <SelectImage
        sdk={() => {}}
        imageName={'imageName'}
        setImageUrl={() => {}}
        setImageStatus={() => {}}
        imageUrl={'imageUrl'}
        selectedImage={''}
        setImageName={() => {}}
        setSelectedImage={() => {}}
        imageAssets={imageAssets}
        setImageAssets={() => {}}
        url={url}
        setUrl={() => {}}
      />
    )
    const autoSelect = await document.querySelector(
      '[data-test-id="AutoComplte"]'
    )
    const proceedButton = await document.querySelector(
      '[data-test-id="ProceedButton"]'
    )

    autoSelect.value = 'F52T0mHLmmSTFBhhBDw6O'
    if (autoSelect.value === 'F52T0mHLmmSTFBhhBDw6O') {
      url.url = 'Ragavank'
    }
    expect(proceedButton).toBeDisabled()
  })
})
