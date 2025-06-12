import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Track } from '@/types/track';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Share, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ShareTrackDialogProps {
  track: Track;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareTrackDialog({ track, isOpen, onClose }: ShareTrackDialogProps) {
  const [shareType, setShareType] = useState<'private' | 'public'>('private');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    if (shareType === 'private' && !recipientUsername) {
      toast({
        title: "Error",
        description: "Please enter a recipient username",
        variant: "destructive"
      });
      return;
    }

    setIsSharing(true);

    try {
      // If private, find the recipient's profile first
      let recipientId;
      if (shareType === 'private') {
        const { data: recipientProfile, error: recipientError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', recipientUsername)
          .single();

        if (recipientError || !recipientProfile) {
          throw new Error('Recipient not found');
        }

        recipientId = recipientProfile.id;
      }

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }

      // Create share record
      const { error: shareError } = await supabase
        .from('shared_tracks')
        .insert({
          track_id: track.id,
          shared_by: session.user.id,
          shared_with: shareType === 'private' ? recipientId : null,
          share_type: shareType
        });

      if (shareError) {
        throw shareError;
      }

      toast({
        title: "Success",
        description: shareType === 'private' 
          ? `Track shared with @${recipientUsername}`
          : "Track shared publicly",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to share track",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/track/${track.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Track</DialogTitle>
          <DialogDescription>
            Share "{track.title}" with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Share Type</Label>
            <Select
              value={shareType}
              onValueChange={(value: 'private' | 'public') => setShareType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private Share</SelectItem>
                <SelectItem value="public">Public Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {shareType === 'private' && (
            <div className="space-y-2">
              <Label>Recipient Username</Label>
              <Input
                placeholder="Enter username"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>
          )}

          {shareType === 'public' && (
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={`${window.location.origin}/track/${track.id}`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyShareLink}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleShare} disabled={isSharing}>
            <Share className="h-4 w-4 mr-2" />
            {isSharing ? 'Sharing...' : 'Share'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 