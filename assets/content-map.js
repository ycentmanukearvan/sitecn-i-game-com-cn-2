const contentMap = {
  sections: [
    { id: "home", title: "首页", tags: ["爱游戏", "推荐", "热门"] },
    { id: "news", title: "新闻中心", tags: ["爱游戏", "公告", "更新"] },
    { id: "guides", title: "攻略专区", tags: ["爱游戏", "攻略", "技巧"] },
    { id: "community", title: "社区互动", tags: ["爱游戏", "论坛", "讨论"] },
    { id: "support", title: "客服支持", tags: ["爱游戏", "帮助", "FAQ"] }
  ],
  keywords: [
    { word: "爱游戏", weight: 10 },
    { word: "游戏平台", weight: 8 },
    { word: "新手引导", weight: 5 },
    { word: "活动中心", weight: 6 },
    { word: "版本更新", weight: 7 }
  ],
  siteUrl: "https://sitecn-i-game.com.cn",
  lastUpdated: "2025-03-21"
};

function searchContent(query, data) {
  if (!query || typeof query !== "string") return [];
  const q = query.toLowerCase().trim();
  if (q === "") return [];

  const results = [];

  data.sections.forEach(section => {
    const matchInTitle = section.title.toLowerCase().includes(q);
    const matchInTags = section.tags.some(tag => tag.toLowerCase().includes(q));
    if (matchInTitle || matchInTags) {
      results.push({
        type: "section",
        id: section.id,
        label: section.title,
        matchField: matchInTitle ? "title" : "tags"
      });
    }
  });

  data.keywords.forEach(kw => {
    if (kw.word.toLowerCase().includes(q)) {
      results.push({
        type: "keyword",
        word: kw.word,
        weight: kw.weight
      });
    }
  });

  return results;
}

function filterByTag(tag, data) {
  if (!tag || typeof tag !== "string") return [];
  const t = tag.toLowerCase().trim();
  return data.sections
    .filter(section => section.tags.some(tag => tag.toLowerCase() === t))
    .map(section => ({
      id: section.id,
      title: section.title,
      matchedTag: t
    }));
}

function getSectionIdsByKeyword(keyword, data) {
  const kw = keyword.toLowerCase().trim();
  if (!kw) return [];
  const ids = [];
  data.sections.forEach(section => {
    if (
      section.title.toLowerCase().includes(kw) ||
      section.tags.some(tag => tag.toLowerCase() === kw)
    ) {
      ids.push(section.id);
    }
  });
  return ids;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    filterByTag,
    getSectionIdsByKeyword
  };
}