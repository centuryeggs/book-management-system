import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import AddBookDialog from "./AddBookDialog";
interface Book {
  id?: string;
  name: string;
  author: string;
  description: string;
  cover: string;
}

const Home: React.FC = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [searchBookName, setSearchBookName] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBookName(e.target.value);
  };

  const searchBook = () => {
    console.log("search book", searchBookName);
    getBookList(searchBookName);
  };



  // 页面加载时获取图书列表
  const getBookList = (searchBookName: string) => {
    console.log("get book list", searchBookName);
    axios
      .get("http://localhost:3000/book/list", {
        params: {
          name: searchBookName,
        },
      })
      .then((res) => {
        setBookList(res.data);
      });
  };

  useEffect(() => {
    getBookList(searchBookName);
  }, [searchBookName]);

  return (
    <div className="flex flex-col h-screen px-32 py-16">
      <h1 className="text-2xl font-bold mb-4">Book Management System</h1>
      <div className="flex gap-4">
        <Input
          className="w-72"
          placeholder="Please enter book name"
          value={searchBookName}
          onChange={handleSearch}
        />
        <Button className="cursor-pointer" onClick={searchBook}>
          <Search className="w-4 h-4" />
          Search Book
        </Button>
        <AddBookDialog />
      </div>
      <div className="flex flex-col gap-4">
        {bookList.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{book.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
