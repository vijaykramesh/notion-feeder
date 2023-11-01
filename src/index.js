import getNewFeedItems from './feed';
import {
  addFeedItemToNotion,
  deleteOldUnreadFeedItemsFromNotion,
} from './notion';
import jsonToNotionBlocks from './parser';

async function index() {
  const feedItems = await getNewFeedItems();

  for (let i = 0; i < feedItems.length; i++) {
    const item = feedItems[i];
    const notionItem = {
      title: item.title,
      link: item.link,
      source: item.source,
      content: jsonToNotionBlocks(item.content),
    };
    await addFeedItemToNotion(notionItem);
  }

  await deleteOldUnreadFeedItemsFromNotion();
}

index();
