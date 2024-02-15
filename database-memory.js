import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list() {
    return Array.from(this.#videos.entries()).map((videoArr) => {
      const id = videoArr[0];
      const data = videoArr[1];

      return { id, ...data };
    });
  }

  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id, video);
  }
}
