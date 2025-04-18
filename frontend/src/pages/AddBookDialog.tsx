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

interface AddBookDialogProps {
  onSuccess?: () => void;
}

interface AddBookForm {
  name: string;
  author: string;
  description: string;
  cover: string;
}

const AddBookDialog: React.FC<AddBookDialogProps> = ({ onSuccess }) => {
  const [open, setOpen] = useState(false)
  const addBook = () => {
    axios.post("http://localhost:3000/book/create", addBookForm).then((res) => {
      console.log("add book success", res);
      toast.success("Add book success");
      setOpen(false);
      onSuccess?.();
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

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/book/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.code === 200) {
        setAddBookForm({ ...addBookForm, cover: response.data.data });
        toast.success('Cover uploaded successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload cover');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <div
                className="col-span-3 border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[120px]"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    handleCoverChange({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
                onClick={() => {
                  document.getElementById('cover-upload')?.click();
                }}
              >
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
                <div className="text-sm text-gray-600">
                  Drag and drop image here or click to upload
                </div>
                {addBookForm.cover && (
                  <img
                    src={'http://localhost:3000/' + addBookForm.cover}
                    alt="Preview"
                    className="mt-2 max-h-40 object-contain"
                  />
                )}
              </div>
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
