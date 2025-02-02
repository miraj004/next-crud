import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BankList from './bank-list';

export default async function BanksPage() {
 

  return (
    <div className="flex">
      <div className="container mx-auto py-10">
        <div className="my-2">
          <Link href="/dashboard">
            <Button>
              Dashboard
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Banks Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
             <BankList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
