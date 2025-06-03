import { SellerProfileForm } from "@/components/seller/SellerProfileForm";
import { SellerProfileFormData } from "@/types/seller";

export default function SellerProfilePage() {
  const handleSubmit = async (data: SellerProfileFormData) => {
    // TODO: Handle form submission with your backend
    console.log("Form submitted:", data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create Seller Profile</h1>
      <div className="max-w-3xl mx-auto">
        <SellerProfileForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 