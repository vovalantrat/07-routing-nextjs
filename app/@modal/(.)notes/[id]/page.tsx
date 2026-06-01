import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}