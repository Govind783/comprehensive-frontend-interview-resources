import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const InfiniteScrollDemo = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const itemCount = items.length + 1; // Always show one extra for loading
  
  async function loadMoreItems() {
    if (loading) return;
    
    try {
      setLoading(true);
      const page = Math.floor(items.length / 10) + 1;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const data = await response.json();
      setItems([...items, ...data]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadMoreItems();
  }, []);
  
  const Item = ({ index, style }) => {
    if (index === items.length) {
      return (
        <div style={{...style, textAlign: "center", padding: "20px"}}>
          {loading ? "Loading..." : "Scroll for more..."}
        </div>
      );
    }
    
    const item = items[index];
    return (
      <div style={{...style, padding: "20px", borderBottom: "1px solid #eee"}}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    );
  };
  
  return (
    <div>
      <h1>Infinite Scroll Demo</h1>
      <InfiniteLoader
        isItemLoaded={index => index < items.length}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        threshold={2}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={600}
            width="100%"
            itemCount={itemCount}
            itemSize={150}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default InfiniteScrollDemo;