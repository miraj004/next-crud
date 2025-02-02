import NavLinks from "@/components/nav-links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex flex-col justify-center items-center">
      <Card className="max-w-xl mx-auto bg-white shadow-lg border border-gray-200">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-800">Welcome to App 1 Website!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-600 text-sm">
            Welcome to our App 1 website. We provide excellent services to help you grow and succeed.
            Please log in to access the dashboard or learn more.
          </p>
          
          <div className="flex justify-center space-x-4">
            <NavLinks/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
