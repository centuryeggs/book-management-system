import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
interface AddBookForm {
  name: string;
  author: string;
  description: string;
  cover: string;
}

const AddBookDialog = () => {
  const addBook = () => {
    axios.post("http://localhost:3000/book/create", addBookForm).then((res) => {
      console.log("add book success", res);
      toast.success("Add book success");
    }).catch((err) => {
      console.log("add book failed", err);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Add book failed");
      }
    });
  };
  const [addBookForm, setAddBookForm] = useState<AddBookForm>({
    name: "",
    author: "",
    description: "",
    cover: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus className="w-4 h-4" />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
          <DialogDescription>
            Add a new book here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            addBook();
            event.preventDefault();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={addBookForm.name}
                onChange={(e) => {
                  setAddBookForm({ ...addBookForm, name: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Author
              </Label>
              <Input
                id="username"
                value={addBookForm.author}
                onChange={(e) => {
                  setAddBookForm({ ...addBookForm, author: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={addBookForm.description}
                onChange={(e) => {
                  setAddBookForm({ ...addBookForm, description: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cover" className="text-right">
                Cover
              </Label>
              <Input
                id="cover"
                value={addBookForm.cover}
                onChange={(e) => {
                  setAddBookForm({ ...addBookForm, cover: e.target.value });
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
