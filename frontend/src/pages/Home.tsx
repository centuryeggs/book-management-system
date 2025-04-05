import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Search, Trash } from "lucide-react";
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
import EditBookDialog from "./EditBookDialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    getBookList(searchBookName);
  };
  const removeBook = (id: string) => {
    axios
      .delete("http://localhost:3000/book/delete/" + id)
      .then((res) => {
        console.log(res);
        toast.success("Delete book success");
        getBookList(searchBookName);
      }).catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  // Load book list when page loads
  useEffect(() => {
    getBookList("");
  }, []);

  const getBookList = (searchBookName: string) => {
    axios
      .get("http://localhost:3000/book/list", {
        params: { name: searchBookName },
      })
      .then((res) => {
        setBookList(res.data);
      });
  };
  return (
    <div className="flex flex-col h-screen px-32 py-16">
      <h1 className="text-2xl font-bold mb-4">Book Management System</h1>
      <div className="flex gap-4 mb-4">
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
        <AddBookDialog onSuccess={() => getBookList(searchBookName)} />
      </div>
      <div className="flex flex-wrap gap-4">
        {bookList.map((book) => (
          <Card key={book.id} className="w-70 flex flex-col gap-4">
            <CardHeader className="flex-auto">
              <div className="relative overflow-hidden h-[360px]">
                <img 
                  src={'http://localhost:3000/' + book.cover}
                  alt={book.name + '\'s cover'}
                  className="w-full h-full object-contain"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-2">
              <CardTitle className="pl-2">{book.name}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardContent>
            <CardFooter>
              <EditBookDialog book={book} onSuccess={() => getBookList(searchBookName)} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="cursor-pointer ml-2" variant="outline">
                    <Trash className="w-4 h-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete this book?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => book.id && removeBook(book.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
