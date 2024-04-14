import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  // 모든 Post 조회
  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  // Post ID로 조회
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    // const post = posts.find((post) => post.id === +id);
    // if (!post) {
    //   throw new NotFoundException();
    // }
    // return post;
  }

  // Post 생성
  async createPost(authorId: number, postDto: CreatePostDto) {
    //create : 저장할 객체 생성
    // save : 객체를 저장한다. create 메서드에서 생성한 객체를.

    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;

    // const post: PostModel = {
    //   id: posts[posts.length - 1].id + 1,
    //   author,
    //   title,
    //   content,
    //   likeCount: 0,
    //   commentCount: 0,
    // };
    // posts = [...posts, post];
    // return post;
    //
  }

  // Post 수정
  async updatePost(postId: number, title: string, content: string) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    // const post = posts.find((post) => post.id === +postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;

    // posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    // return post;
  }

  // Post 삭제
  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    //   const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    //   posts = posts.filter((post) => post.id !== postId);

    return postId;
  }
}
